import * as userController from "../controllers/userController.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { jest } from "@jest/globals"; // Importing jest from @jest/globals

jest.mock("../models/User.js");
jest.mock("bcryptjs");
jest.mock("../utils/createToken.js");

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  describe("loginUser", () => {   

    it("should return an error if user not found", async () => {
      User.findOne.mockResolvedValueOnce(null); // Simulate user not found

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.loginUser(
        { body: { email: "nonexistent@example.com", password: "password123" } },
        res
      );

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });
  });

  describe("logoutCurrentUser", () => {
    it("should logout the current user", async () => {
      const res = {
        cookie: jest.fn(),
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await userController.logoutCurrentUser({}, res);

      expect(res.cookie).toHaveBeenCalledWith("jwt", "", expect.any(Object));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Logged out successfully" });
    });
  });
});