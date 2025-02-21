import { addData, getData, onGetData, deleteData, updateData } from "/Firebase.js";

const productForm = document.getElementById("productForm");
const inventoryTable = document.getElementById("inventoryTable");

window.addEventListener("DOMContentLoaded", async () => {
  onGetData((querySnapshot) => {
    let html = "";

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
        <td>${data.ownerDepartment}</td>
        <td><button class="btn-edit py-2.5 px-6 text-sm bg-yellow-50 text-yellow-500 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-yellow-100 hover:text-yellow-700" data-id="${doc.id}">Editar</button>
        <button class="btn-delete py-2.5 px-6 text-sm bg-red-50 text-red-500 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-red-100 hover:text-red-700" data-id="${doc.id}">Eliminar</button>
        </td>
        
      `;
    });

    const tableBody = document.getElementById("inventoryTable"); 
    tableBody.innerHTML = html;

    inventoryTable.innerHTML = html;

    const btnsDelete = inventoryTable.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", ({target:{dataset}}) => {
        if(confirm("¿Estás seguro de eliminar este producto?"))
        deleteData(dataset.id);
      });
    });

    const btnsEdit = inventoryTable.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", ({target:{dataset}}) => {
        const product = querySnapshot.docs.find((doc) => doc.id === dataset.id).data();
        productForm["productId"].value = product.productId;
        productForm["productName"].value = product.productName;
        productForm["productBrand"].value = product.productBrand;
        productForm["productModel"].value = product.productModel;
        productForm["productSerie"].value = product.productSerie;
        productForm["productCategory"].value = product.productCategory;
        productForm["ownerDepartment"].value = product.ownerDepartment;
        productForm["ownerName"].value = product.ownerName;
      });
    });

    productForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const productId = productForm["productId"].value;
      const productName = productForm["productName"].value;
      const productBrand = productForm["productBrand"].value;
      const productModel = productForm["productModel"].value;
      const productSerie = productForm["productSerie"].value;
      const productCategory = productForm["productCategory"].value;
      const ownerDepartment = productForm["ownerDepartment"].value;
      const ownerName = productForm["ownerName"].value;

      addData(
        productId,
        productName,
        productBrand,
        productModel,
        productSerie,
        productCategory,
        ownerDepartment,
        ownerName
      );

      productForm.reset();
    });
  });
});
