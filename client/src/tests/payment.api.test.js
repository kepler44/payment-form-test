var supertest = require("supertest");

jest.setTimeout(5000);

describe("Test payment form", () => {
	it("Validate wrong data A", async () => {
		const data = {
			CardNumber: undefined,
			ExpDate: undefined,
			Cvv: "",
			Amount: "asd",
		};
		await supertest("http://localhost:8080")
			.post("/payments/validate")
			.send(data)
			.expect(200)
			.then((res) => {
				expect(res.body).toBeDefined(); //test if response body is defined
				expect(res.body.errors.CardNumber).toBe("0x0");
				expect(res.body.errors.ExpDate).toBe("0x2");
				expect(res.body.errors.Cvv).toBe("0x4");
				expect(res.body.errors.Amount).toBe("0x6");
			});
	});

	it("Validate wrong data B", async () => {
		const data = {
			CardNumber: "1233",
			ExpDate: "1233",
			Cvv: "1233",
			Amount: "11111111111",
		};
		await supertest("http://localhost:8080")
			.post("/payments/validate")
			.send(data)
			.expect(200)
			.then((res) => {
				expect(res.body).toBeDefined(); //test if response body is defined
				expect(res.body.errors.CardNumber).toBe("0x1");
				expect(res.body.errors.ExpDate).toBe("0x3");
				expect(res.body.errors.Cvv).toBe("0x5");
				expect(res.body.errors.Amount).toBe("0x7");
			});
	});

	it("Validate correct data", async () => {
		const data = {
			CardNumber: "0000000000000000",
			ExpDate: "112022",
			Cvv: "123",
			Amount: "3131",
		};
		await supertest("http://localhost:8080")
			.post("/payments/validate")
			.send(data)
			.expect(200)
			.then((res) => {
				expect(res.body).toBeDefined(); //test if response body is defined
				expect(res.body.errors).toBe(undefined);
			});
	});

	it("Send correct data", async () => {
		const data = {
			CardNumber: "0000000000000000",
			ExpDate: "112022",
			Cvv: "123",
			Amount: "3131",
		};
		await supertest("http://localhost:8080")
			.post("/payments")
			.send(data)
			.expect(200)
			.then((res) => {
				expect(res.body).toBeDefined(); //test if response body is defined
				expect(res.body.RequestId).toBeDefined();
				expect(res.body.Amount).toBeDefined();
				//expect(res.body.errors).toBe(undefined);
			});
	});
});

/* 
//GET all users      
describe("GET all user details", () => {
  
  try{
      beforeEach(function () {
        console.log("GET all users details ")
    });
          
      afterEach(function () {
        console.log("All users' details are retrieved")
    });

      test("GET user output", async done =>{
        await request.request.get(`api/users`) //get() of supertest
                                //.set('Authorization', `Token ${request.token}`) 
                                .expect(200).then((response) =>{
                                console.log("GET RESPONSE : ", response.body);
                                done();
                    })
      })
    }
  catch(err){
    console.log("Exception : ", err)
    }
}); */
