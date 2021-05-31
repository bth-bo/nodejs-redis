/* simple integration test*/

const request = require("supertest");
const app = require("../app/hello-2");
const app = express();

describe("GET /", () => {
    it("respond with Hello-2", (done) => {
        request(app)
        .get("/hello2").expect("Hello-2", done)
    })
});
