"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a user
        yield client.user.create({
            data: {
                username: "ashutosh123",
                password: "password123",
                age: 30,
            },
        });
        console.log("User created successfully");
        // Fetch all users from the table
        const users = yield client.user.findMany(); // Queries the entire 'user' table
        console.log("Users in the table:", users);
    });
}
createUser();
