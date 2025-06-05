import { createServer, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      van: Model,
    },

    seeds(server) {
        server.create("van", {
            id: "1",
            name: "Super Comfy",
            price: 100,
            imageUrl: "/images/dreamfinder.png",
            type: "simple",
            description: "A cozy van perfect for weekend getaways.",
        })
      server.create("van", {
        id: "2",
        name: "The Cruiser",
        price: 120,
        imageUrl: "/images/the-cruiser.png",
        type: "luxury",
        description: "Experience the road in style and comfort.",
      })

      server.create("van", {
        id: "3",
        name: "Reliable Red",
        price: 80,
        imageUrl: "/images/reliable-red.png",
        type: "rugged",
        description: "Built for off-road adventures and tough terrains.",
      })

      server.create("van", {
        id: "4",
        name: "Modest Explorer",
        price: 70,
        imageUrl: "/images/modest-explorer.png",
        type: "simple",
        description: "A compact van perfect for city adventures.",
      })

      server.create("van", {
        id: "5",
        name: "Beach Bum",
        price: 90,
        imageUrl: "/images/beach-bum.png",
        type: "family",
        description: "Spacious and comfortable for family trips.",
      })

      server.create("van", {
        id: "6",
        name: "Green Wonder",
        price: 70,
        imageUrl: "/images/green-wonder.png",
        type: "rugged",
        description: "Eco-friendly van with solar panels and a cozy interior.",
      })
    },

    routes() {
      this.namespace = "api"
      this.logging = false

      this.get("/vans", (schema) => {
        return schema.vans.all()
      })

      this.get("/vans/:id", (schema, request) => {
        const id = request.params.id
        return schema.vans.find(id)
      })
    },
  })

  return server
}

