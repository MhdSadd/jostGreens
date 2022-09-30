let bussinessDocInput = document.getElementById("bus_doc");
let financialDocInput = document.getElementById("fin_doc");
let imageContainer = document.getElementById("images");
let businessFiles = document.getElementById("business_files");
let financialFiles = document.getElementById("financial_files");

function preview() {
  imageContainer.innerHTML = "";
  businessFiles.textContent = `${bussinessDocInput.files.length} Files Selected`;
  financialFiles.textContent = `${financialDocInput.files.length} Files Selected`;
}
