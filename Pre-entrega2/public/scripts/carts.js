const template = (data) => `
<div class="Container container-fluid ">
    <figure class="figure">
    <img style="width: 253px; height: 351px" class="img-fluid rounded" src="${data.product_id.photo}" alt="${data._id}" />
        <figcaption class="editorial figure-caption">${data.product_id.publisher}</figcaption>
        <figcaption class="titulo figure-caption">${data.product_id.title}</figcaption>
        <figcaption class="precio figure-caption">${data.product_id.price}</figcaption>
        <button type="button" class="btn" onclick="DeleteFromCart('${data._id}')">DeleteFromCart</button>
        <input type="number" id="quantity_${data._id}" value="1" min="1">
        <button type="button" class="btn" onclick="updateQuantity('${data._id}')">Update Quantity</button>
        <button type="button" class="btn btn-danger" onclick="cancelPurchase('${data._id}')">Cancel Purchase</button>
        <button type="button" class="btn btn-primary" onclick="finalizePurchase('${data.user_id._id}')">Finalize Purchase</button>
    </figure>
</div>`;


fetch("/api/carts?user_id=664007d71030968c5041b1b2")
    .then(res => res.json())
    .then(res => {
        console.log(res);
        const products = Array.isArray(res.response) ? res.response : [res.response];
        console.log(products);
        document.querySelector("#productsOnCart").innerHTML = products.map(each => template(each)).join("")
    })
    .catch(err => console.log(err));

    async function DeleteFromCart(cid) {
        try {
            const url = "/api/carts/"+cid
            const opts = {
                method: "DELETE",
                headers: {"Content-Type" : "application/json"}
            }
            let response = await fetch(url, opts)
            response = await response.json()
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    async function updateQuantity(cid) {
        const quantity = document.querySelector(`#quantity_${cid}`).ariaValueMax;
        try {
            const url = "/api/carts/"+cid
            const opts = {
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({ quantity: parseInt(quantity) })
            }
            let response = await fetch(url, opts)
            response = await response.json()
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    async function finalizePurchase(cid, pid) {
        try {
            const data = {
                user_id: "66300e78465a634dfd0105df",
                product_id: pid,
            }
            const url = "/api/carts"+cid
            const opts = {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({ data: data })
            };
            let response = await fetch(url, opts)
            response = await response.json()
            if (response.success) {
                console.log("Compra finalizada");
            } else {
                console.log("Error al finalizar la compra", response.error);
            }
        } catch (error) {
            console.log("Error", error);
        }
    }

async function cancelPurchase(cid) {
    try {
        const url = "/api/carts/" + cid;
        const opts = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        };
        let response = await fetch(url, opts);
        response = await response.json();
        if (response.success) {
            console.log("Compra cancelada con éxito");
        } else {
            console.log("Error al cancelar la compra:", response.error);
        }
    } catch (error) {
        console.log("Error:", error);
    }
}
