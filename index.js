const express = require("express");
const router = express.Router();
const app = express();

const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Importar la clase Contenedor y luego instanciarla:

app.use(express.static("public"));

app.use("/api", router);

app.listen(port, () => {
  console.log("Servidor en puerto 8080");
});

const Contenedor = require("./src/contenedor");

let contenedor = new Contenedor("./productos.json");

router.get("/productos", async (req, res) => {
  const lista = await contenedor.getAll();
  res.send(lista);
});

// GET BY ID

router.get("/productos/:id", async (req, res) => {
  const { id } = req.params;

  const productById = await contenedor.getById(id);

  if (productById) {
    res.send(productById);
  } else {
    res.send("no existe un producto con esa id");
  }
});

// POST

router.post("/productos", async (req, res) => {
  const { body } = req;

  await contenedor.saveNewProduct(body);

  res.send(body);
});

// DELETE

router.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;

  const borrado = await contenedor.deleteById(id);

  if (borrado) {
    res.send({ borrado });
  } else {
    res.send("El producto que se intenta borrar no existe.");
  }
});

// PUT

router.put("/productos/:id", async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const anterior = await contenedor.getById(id);

  const nuevo = await contenedor.updateById(id, body);

  if (anterior) {
    res.send({ anterior, nuevo });
  } else {
    res.send("El producto que se intenta actualizar no existe.");
  }
});

//////////////////// carrito

const ListaCarro = require("./src/contenedor.js");
let carrito = new ListaCarro("./carrito.json");

router.get("/carrito", async (req, res) => {
  const lista = await carrito.getAll();
  res.send(lista);
});

// GET BY ID

router.get("/carrito/:id", async (req, res) => {
  const { id } = req.params;

  const carritoById = await carrito.getById(id);

  if (carritoById) {
    res.send(carritoById);
  } else {
    res.send("no existe un producto con esa id");
  }
});

// DELETE BY ID

router.delete("/carrito/:id", async (req, res) => {
  const { id } = req.params;

  const borrado = await carrito.deleteById(id);

  if (borrado) {
    res.send({ borrado });
  } else {
    res.send("El producto que se intenta borrar no existe.");
  }
});

router.delete("/carrito", async (req, res) => {
  const borrarTodo = await carrito.deleteAll();
  res.sed("carrito vacio");
});

// POST

router.post("/carrito", async (req, res) => {
  const { body } = req;

  let objeto = { producto: { ...body }, fecha: Date.now() };

  await carrito.saveNewProduct(objeto);

  res.send(body);
});

// PUT

router.put("/carrito/:id", async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const anterior = await carrito.getById(id);

  const nuevo = await carrito.updateById(id, body);

  if (anterior) {
    res.send({ anterior, nuevo });
  } else {
    res.send("El producto que se intenta actualizar no existe.");
  }
});
