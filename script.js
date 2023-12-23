let count, sort;

document.addEventListener('DOMContentLoaded', function () {
    let productContainer = document.getElementById('product-container');

    get_count().then(c => {
        // Assign the count value to the global variable
        count = c;

        console.log(count);

        for (let i = 1; i <= count; i++) {
            createProduct(i);
        }
    });
    Set_data("default");
});


async function get_count() {
    //change with your ngrok url except this get_data/${filter}
    // ngrok command: ngrok http 127.0.0.1:5000

    return fetch(`https://f61c-103-99-198-163.ngrok-free.app/count_rows`, {
        method: "GET",
        mode: 'cors',
        headers: {
            // "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        },
    })
        .then(response => response.json())
        .then(data => {
            return data['COUNT(*)'] || data['count(*)'] || 0;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return 0; // Return a default value in case of an error
        });
}



function createProduct(id) {
    let productContainer = document.getElementById('product-container');

    let productDiv = document.createElement('div');
    productDiv.classList.add('pro');

    let img = document.createElement('img');
    img.id = `image-container-${id}`;
    img.src = "";
    img.alt = "";
    productDiv.appendChild(img);

    productDiv.appendChild(document.createElement('br')); // Add a line break

    let title = document.createElement('span');
    title.id = `title-${id}`;
    productDiv.appendChild(title);

    let description = document.createElement('h5');
    description.id = `description-${id}`;
    productDiv.appendChild(description);

    let starDiv = document.createElement('div');
    starDiv.classList.add('star');
    for (let j = 0; j < 5; j++) {
        let starImg = document.createElement('img');
        starImg.src = 'img/star.jpg';
        starImg.alt = '';
        starDiv.appendChild(starImg);
    }

    productDiv.appendChild(starDiv);

    let price = document.createElement('h4');
    price.id = `price-${id}`;

    productDiv.appendChild(price);

    let cartDiv = document.createElement('div');
    cartDiv.classList.add('cart');
    let cartLink = document.createElement('a');
    cartLink.href = "";
    let cartImg = document.createElement('img');
    cartImg.src = 'img/pngwing.com.png';
    cartImg.alt = '';
    cartLink.appendChild(cartImg);
    cartDiv.appendChild(cartLink);
    productDiv.appendChild(cartDiv);
    productContainer.appendChild(productDiv);
}

async function Set_data(filter) {
    console.log(filter);

    //change with your ngrok url except this get_data/${filter}
    // ngrok command: ngrok http 127.0.0.1:5000

    return fetch(`https://f61c-103-99-198-163.ngrok-free.app/get_data/${filter}`, {
        method: "GET",
        mode: 'cors',
        headers: {
            // "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        },
    })
        .then(response => response.json())
        .then(data => {
            let base64ImageData, title, description, price;

            for (let i = 0; i < count; i++) {
                base64ImageData = data[i]['product_img'];
                title = data[i]['name'];
                description = data[i]['description'];
                price = data[i]['price'];

                document.getElementById(`image-container-${i + 1}`).src = 'data:image/jpeg;base64,' + base64ImageData;
                document.getElementById(`title-${i + 1}`).textContent = title;
                document.getElementById(`description-${i + 1}`).textContent = description;
                document.getElementById(`price-${i + 1}`).textContent = "₹" + price;

            }


        })
        .catch(error => console.error('Error fetching data:', error));
}


function filter() {
    var selectedOption = document.getElementById("myDropdown").value;
    if (selectedOption === "asc") {
        Set_data("asc");
    } else if (selectedOption === "desc") {
        Set_data("desc");
    } else {
        Set_data("default");
    }
}