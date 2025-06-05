import { createServer, Model } from "miragejs"

export function makeServer() {
  return createServer({
    models: {
      vans: Model,
    },

    seeds(server) {
      server.create("van", {
        id: "1",
        name: "Modest Explorer",
        price: 60,
        imageUrl: "/images/modest-explorer.png",
        type: "simple",
        description: "A reliable van for everyday adventures.",
      })
        server.create("van", {
            id: "2",
            name: "Luxury Cruiser",
            price: 120,
            imageUrl: "/images/luxury-cruiser.png",
            type: "luxury",
            description: "Experience the road in style and comfort.",
        })
        server.create("van", {
            id: "3",
            name: "Rugged Adventurer",
            price: 80,
            imageUrl: "/images/rugged-adventurer.png",
            type: "rugged",
            description: "Built for off-road adventures and tough terrains.",
        })
        server.create("van", {
            id: "4",
            name: "Compact Explorer",
            price: 70,
            imageUrl: "/images/compact-explorer.png",
            type: "simple",
            description: "A compact van perfect for city adventures.",
        })
        server.create("van", {
            id: "5",
            name: "Family Voyager",
            price: 90,
            imageUrl: "/images/family-voyager.png",
            type: "family",
            description: "Spacious and comfortable for family trips.",
        })
        server.create("van", { id: "6",
             name: "Green Wonder", 
             price: 70,
             imageUrl: "/images/green-wonder.png", 
             type: "rugged",
             description: "Eco-friendly van with solar panels and a cozy interior.",
        })
    },

    routes() {
      this.namespace = "api"

      this.get("/vans", (schema) => {
        return schema.vans.all()
      })

      this.get("/vans/:id", (schema, request) => {
        return schema.vans.find(request.params.id)
      })
    }
  })
}
