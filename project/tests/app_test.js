import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { app } from "../app.js"


Deno.test("GET request to / should return the status code 200", async () => {
    const testClient = await superoak(app);
    await testClient.get("/").expect(200)
})

Deno.test("GET request to /topics should return the status code 303 (redirect)",async () => {
    const testClient = await superoak(app)
    await testClient.get("/").expect(303)
})

Deno.test("GET request to /quiz should return status code 303 (redirect)", async() => {

})