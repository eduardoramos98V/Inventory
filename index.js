import {addData, getData, onGetData} from "/Firebase.js";

const productForm = document.getElementById('productForm');
const inventoryTable = document.getElementById('inventoryTable');

window.addEventListener('DOMContentLoaded', async () => {
    onGetData((querySnapshot) =>{    
    let html = '';
    
    querySnapshot.forEach((doc) => {
      const data = doc.data(); 
      
      html += `
      <tr>
        <td>${data.productId}</td>
        <td>${data.productName}</td>
        <td>${data.productBrand}</td>
        <td>${data.productModel}</td>
        <td>${data.productCategory}</td>
        <td>${data.productSerie}</td>
        <td>${data.ownerName}</td>
        <td>${data.ownerDepartment}</tr>
      `
    });
    const tableBody = document.getElementById('inventoryTable'); // Cambia 'tableBody' al id de tu tabla
    tableBody.innerHTML = html;

    inventoryTable.innerHTML = html;
});
});

productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const productId = productForm['productId'].value; 
  const productName = productForm['productName'].value;
  const productBrand = productForm['productBrand'].value;
  const productModel = productForm['productModel'].value;
  const productSerie = productForm['productSerie'].value;
  const productCategory = productForm['productCategory'].value;
  const ownerDepartment = productForm['ownerDepartment'].value;
  const ownerName = productForm['ownerName'].value;

  addData(productId, productName, productBrand, productModel, productSerie, productCategory, ownerDepartment, ownerName);
  
  productForm.reset();
});
