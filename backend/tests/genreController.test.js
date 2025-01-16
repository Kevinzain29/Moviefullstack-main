import Genre from "../models/Genre.js";
import * as genreController from "../controllers/genreController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

jest.mock("../models/Genre");

describe("Genre Controller", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe("removeGenre", () => {
      it("should remove a genre successfully", async () => {
        const req = { params: { id: "123" } };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        const mockGenre = { _id: "123", name: "Action" };
        Genre.findByIdAndDelete.mockResolvedValueOnce(mockGenre);
  
        await genreController.removeGenre(req, res);
  
        expect(Genre.findByIdAndDelete).toHaveBeenCalledWith("123");
        expect(res.json).toHaveBeenCalledWith(mockGenre);
      });
    });
  
    describe("listGenres", () => {
      it("should list all genres", async () => {
        const req = {};
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        const mockGenres = [{ name: "Action" }, { name: "Drama" }];
        Genre.find.mockResolvedValueOnce(mockGenres);
  
        await genreController.listGenres(req, res);
  
        expect(Genre.find).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockGenres);
      });
    });
  
    describe("readGenre", () => {
      it("should read a specific genre", async () => {
        const req = { params: { id: "123" } };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
  
        const mockGenre = { _id: "123", name: "Action" };
        Genre.findOne.mockResolvedValueOnce(mockGenre);
  
        await genreController.readGenre(req, res);
  
        expect(Genre.findOne).toHaveBeenCalledWith({ _id: "123" });
        expect(res.json).toHaveBeenCalledWith(mockGenre);
      });
    });
  });