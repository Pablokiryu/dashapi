const expect = require("expect");
const request = require("supertest");
const port = process.env.PORT || 3000;
const app = require("../app");


///TODO : BREAK THIS INTO MULTIPLE TEST SUITES, decoupling routes and etc... 
// should also provide better code coverage. This is barely enough. 
describe("app testing", () => {
    it("has app module", () =>{ 
        expect(app).toBeDefined;
    });

    let server;
    beforeAll((done)=>{
        server = app.listen(port,done);
    });
    
    afterAll( (done) =>{
        app.mongoose.connection.close();
        server.close(done);
    });

    describe("Users Route",()=>{
        it("can create a new user",async ()=>{
            await request(server).post("/Users").send({
                "name": "Sheev Palpatine"
            }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json').expect(201);
        });

        it("can fetch all Users",async ()=>{
            await request(server).get("/Users").set('Accept', 'application/json').expect(200);
        });

        it("can fetch an specific User", async()=>{
            var id = "5b908da8045cb4413c4a39be";
            await request(server).get(`/Users/${id}`).set('Accept', 'application/json').expect(200);
        });
    });
    describe("topActiveUsers Route",()=>{
        it("can fetch the top active Users",async ()=>{
            await request(server).get("/topActiveUsers").set('Accept', 'application/json').expect(200);
        });
    });
    describe("Applications Route", ()=>{
        it("can fetch all Applications",async ()=>{
            await request(server).get("/Applications").set('Accept', 'application/json').expect(200);
        });
    });
    describe("Listings Route",()=>{
        it("can fetch all Listings",async ()=>{
            await request(server).get("/Listings").set('Accept', 'application/json').expect(200);
        });
    });

    describe("404",() =>{
        it("returns a 404", async ()=>{
            await request(server).get("/Fails").expect(404); 
        });
    });
});
