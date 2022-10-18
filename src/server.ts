import express, { Request, Response } from "express";
import { getClient } from "./client/elasticsearch";
import websiteController from "./controllers/website.controller";

const app = express();

app.get("/", async (req: Request, res: Response) => {
  const client = getClient();

  const result =  await client.index({
    index: "elastic_test",
    type: "type_elastic_test",
    body: {
        user: "Johnson",
        password: "avgs85d",
        email: "john@email.com",
    }
  })

  return res.json(result);
});


app.get("/website/create", websiteController.create)
app.get("/website/findAll", websiteController.findAll)
app.get("/search", websiteController.findByQuery)


app.listen(3333, () => {
  console.log("running");
});
