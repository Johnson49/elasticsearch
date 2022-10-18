import { Request, Response } from "express";
import fs from "fs";
import { getClient } from "../client/elasticsearch";

class WebSiteController {
  async create(request: Request, response: Response) {
    const path = __dirname + "\\sites.json";

    fs.readFile(path, "utf-8", async (err, data) => {
      if (err) return;

      let jsonData = JSON.parse(data);
      let arrayJson = Object.values(jsonData);

      for await (let data of arrayJson) {
        await getClient().index(
          {
            index: "websites",
            type: "type_website",
            body: data,
          },
          (erro) => {
            if (erro) {
              return response.status(400).json({ error: erro });
            }
          }
        );
      }
    });

    return response.json({ message: "Index ok!" });
  }

  async findAll(request: Request, response: Response) {
    const data = await getClient().search({
      index: "websites",
      size: 30,
    });

    return response.json(data);
  }

  async findByQuery(request: Request, response: Response) {
    const pesquisa = request.query.q;

    const data = await getClient().search({
      body: {
        query: {
          match: {
            descricao: pesquisa,
          },
        },
      },
    });

    return response.json(data);
  }
}

export default new WebSiteController();
