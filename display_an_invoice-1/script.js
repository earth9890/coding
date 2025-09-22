
document.addEventListener('DOMContentLoaded', function() {
    let currentData = null;

    fetch('/api/invoice')
        .then(resp => resp.json())
        .then(data => {
            currentData = data;
            showInvoiceList();
        })
        .catch(err => console.error("Failed to load invoice:", err));

    function showInvoiceList() {
        let html = '<ul>';
        currentData.items.forEach((item, index) => {
            html += `<li class="clickable" onclick="showItemDetails(${index})">${item.name} - $${item.price}</li>`;
        });
        html += '</ul>';
        document.getElementById('invoice-container').innerHTML = html;
    }

    window.showItemDetails = function(index) {
        const item = currentData.items[index];
        const customer = currentData.customer;
        let html = `
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Customer: ${customer.name}</p>
                <p>Address: ${customer.address}</p>
                <button onclick="backToList()">Back to List</button>
            </div>
        `;
        document.getElementById('invoice-container').innerHTML = html;
    };

    window.backToList = function() {
        showInvoiceList();
    };
});
