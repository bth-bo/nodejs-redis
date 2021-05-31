/* simple integration test*/

const request = require("supertest");
const app = require("../app/hello-1");
const app = express();

describe("GET /", () => {
    it("respond with Hello-1", (done) => {
        request(app)
        .get("/hello1").expect("Hello-1", done)
    })
});
