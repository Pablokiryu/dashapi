const expect = require("expect");
const request = require("supertest");
const app = require("../app");


// it("should add two numbers",() =>
// {
//     var res  = 2+3;
//     res = res.toString();

//     expect(res).toBe("5").toBeA("string");
    
// });

// test("Adds 33 and 44", () =>{
//     expect(33+44).toBe(77);
// });

describe("app testing", () => {
    it("has app module", () =>{ 
        expect(app).toBeDefined;
    });

    let server;
    beforeAll(()=>{
        server = app.listen(3000);
    });
    
    afterAll((done) =>{
        app.mongoose.connection.close();
        server.close();
    });

    describe("Users Route",()=>{
        it("can create a new user", ()=>{
            request(server).post("/Users").send({
                "name": "Sheev Palpatine"
            }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json').expect(201);
        });

        it("can fetch all Users", ()=>{
            request(server).get("/Users").set('Accept', 'application/json').expect(200).end(function(err,res){
                if(err) throw err;
            });
        });

        it("can fetch an specific User", ()=>{
            var id = "5b908da8045cb4413c4a39be";
            request(server).get(`/Users/${id}`).set('Accept', 'application/json').expect(200);
        });
    });
    describe("topActiveUsers Route",()=>{
        it("can fetch the top active Users", ()=>{
            request(server).get("/topActiveUsers").set('Accept', 'application/json').expect(200).end(function(err,res){
                if(err) throw err;
            });
        });
    });
    describe("Applications Route",()=>{
        it("can fetch all Applications", ()=>{
            request(server).get("/Applications").set('Accept', 'application/json').expect(200).end(function(err,res){
                if(err) throw err;
            });
        });
    });
    describe("Listings Route",()=>{
        it("can fetch all Listings", ()=>{
            request(server).get("/Listings").set('Accept', 'application/json').expect(200).end(function(err,res){
                if(err) throw err;
            });
        });
    });

    describe("404",() =>{
        it("returns a 404", async ()=>{
            await request(server).get("/Fails").expect(404); 
        });
    });
});
