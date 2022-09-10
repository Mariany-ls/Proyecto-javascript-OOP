class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  //User interface

  addProduct(product) {
    //el product es la variable que contiene los datos del producto que se ingreso en el formulario

    const productList = document.getElementById("product-list");
    const element = document.createElement("div"); //esto va a crear un elemento en el html, en este caso un div, y dentro de el va a ir el producto
    element.innerHTML = `
      <div class="card text-center mb-4">
          <div class="card-body">
              <strong>Product Name</strong>: ${product.name}
              <strong>Product Price</strong>: $${product.price}
              <strong>Product Year</strong>: ${product.year}
              <a href="#" class="btn btn-danger" name="delete">Delete</a>
          </div>
      </di>
  `; //Esto va a ir dentro del id "product-list" que va a ir en el HTML

    productList.appendChild(element);
  }

  resetForm() {
    document.getElementById("product-form").reset(); //este metodo es para resetear el formulario
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      //si el elemento que se captura, tiene esa propiedad llamada delete, significa que se dio click al enlace <a>, osea donde esta el boton
      element.parentElement.parentElement.parentElement.remove();
      this.showMessage("Product Deleted Successfully!", "danger");
    }
  }

  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-3`;
    div.appendChild(document.createTextNode(message));
    //Mostrando en el DOM
    const container = document.querySelector(".container"); //para guardar todo el contenido del documento
    const app = document.querySelector("#App"); //esto es porque se quiere insertar dentro del contenedor un mensaje que se quiere mostrar antes de toda la aplicacion
    container.insertBefore(div, app); //antes del container se va a insertar el div que se creo al principio, y el div va a estar antes de app
    setTimeout(function () {
      document.querySelector(".alert").remove(); //mensaje de que se agrego el producto
    }, 3000);
  }
}

//DOM events
document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;

    const product = new Product(name, price, year);

    const ui = new UI(); //este objeto ui es el que obtiene addProduct, deleteProduct y showMessage

    if (name === "" || price === "" || year === "") {
      return ui.showMessage("Complete Fields Please", "info");
    }

    ui.addProduct(product); //con el ui, se llama al metodo addProduct, y se le pasa el producto para que lo muestre
    ui.resetForm();
    ui.showMessage("Product Added Successfully!", "success");

    e.preventDefault(); //Esto es para que la pagina no se vaya a refrescar despues del submit
  });

document.getElementById("product-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.deleteProduct(e.target);
});
