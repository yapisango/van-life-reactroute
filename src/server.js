import { createServer, Model, Response } from "miragejs"

let serverInstance;

export function makeServer({ environment = "development" } = {}) {
  if (serverInstance) return serverInstance;

  serverInstance = createServer({
    environment,

    models: {
      vans: Model,
      user: Model,
    },

    seeds(server) {
      server.create("van", {
        id: "1",
        name: "Modest Explorer",
        price: 60,
        description:"123",
        imageUrl: "/images/modest-explorer.png",
        type: "simple",
        hostId: "123",
      })
      server.create("van", {
        id: "2",
        name: "Beach Bum",
        price: 80,
        description:
          "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.",
        imageUrl: "/images/beach-bum.png",
        type: "rugged",
        hostId: "123",
      })
      server.create("van", {
        id: "3",
        name: "Reliable Red",
        price: 100,
        description:
          "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.",
        imageUrl: "/images/reliable-red.png",
        type: "luxury",
        hostId: "456",
      })
      server.create("van", {
        id: "4",
        name: "Dreamfinder",
        price: 65,
        description:
          "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.",
        imageUrl: "/images/dreamfinder.png",
        type: "simple",
        hostId: "789",
      })
      server.create("van", {
        id: "5",
        name: "The Cruiser",
        price: 120,
        description:
          "The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.",
        imageUrl: "/images/the-cruiser.png",
        type: "luxury",
        hostId: "789",
      })
      server.create("van", {
        id: "6",
        name: "Green Wonder",
        price: 70,
        description:
          "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.",
        imageUrl: "/images/green-wonder.png",
        type: "rugged",
        hostId: "123",
      })
      server.create("user", { 
        id: "123", 
        email: "b@b.com", 
        password: "p123", 
        name: "Bob" 
      })
    },

    routes() {
      this.namespace = "api"
      this.logging = false
      this.timing = 2000 

      this.get("/vans", (schema) => {
        //return new Response(400, {}, { error: "Failed to fetch vans" })
        return schema.vans.all()
      })

      this.get("/host/vans", (schema) => {
        return schema.vans.where({ hostId: "123" })
      })

      this.get("/vans/:id", (schema, request) => {
        const id = request.params.id;
        const van = schema.vans.find(id);
        return { van };
      });


      this.get("/host/vans/:id", (schema, request) => {
        const id = request.params.id
        const van = schema.vans.findBy({ id, hostId: "123" })
        return { van }
      })

      this.post("/login", (schema, request) => {
            const { email, password } = JSON.parse(request.requestBody)
            const foundUser = schema.users.findBy({ email, password })

            if (!foundUser) {
                return new Response(401, {}, { message: "No user with those credentials found!" })
            }

            return {
              user: {
                id: foundUser.id,
                email: foundUser.email,
                name: foundUser.name,
              },
              token: "Enjoy your pizza, here is your token!",
            }
      })
    },
  })

  return serverInstance;
}


