/* simple integration test*/

const request = require("superset");
const app = require("../app/hello-2")

describe("GET /", () => {
    it("respond with Hello-2", (done) => {
        request(app).get("/").expect("Hello-2", done)
    })
});