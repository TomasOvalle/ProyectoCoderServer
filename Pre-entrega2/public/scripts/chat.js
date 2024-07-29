console.log(location);
const queries = new URL(location.href)
const pid = queries.searchParams.get("id")
console.log(pid);

const template = (data) => `
    <div class="Container container-fluid ">
        <figure class="figure">
            <img style="width: 253px; height: 351px" class="img-fluid rounded" src="${data.photo}" alt="${data._id}" />
            <figcaption class="editorial figure-caption">${data.publisher}</figcaption>
            <figcaption class="titulo figure-caption">${data.title}</figcaption>
            <figcaption class="precio figure-caption">${data.price}</figcaption>
            <button type="button" class="btn btn-primary" onclick="addToCart('${data._id}')">Add to cart</button>
        </figure>
    </div>`;

async function fetchDetails() {
    try {
        let res = await fetch("/api/products/"+pid);
        res = await res.json();
        console.log(res);
        const product = Array.isArray(res.response) ? res.response : [res.response];
        console.log(product);
        document.getElementById("details").innerHTML = product
            .map((each) => template(each))
            .join("")
    } catch (error) {
        console.log(error);
    }
}

async function addToCart(pid) {
    try {
        const data = {
            user_id: "66300e78465a634dfd0105df",
            product_id: pid,
            quantity: 1
        }
        const url = "/api/carts"
        const opts = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type" : "application/json"}
        }
        console.log(data);
        let response = await fetch(url, opts)
        response = await response.json()
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

fetchDetails();


/*fetch("/api/products/"+pid)
.then(res => res.json())
.then(res => {
    console.log(res);
    const products = Array.isArray(res) ? res : [res];
    console.log(products);
    document.querySelector("#details").innerHTML = products
    .map((each) => template(each))
    .join("");
})
.catch((err) => console.log(err));*/