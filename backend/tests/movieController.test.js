import Movie from "../models/Movie.js";
import * as movieController from "../controllers/movieController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Mock the Movie model
jest.mock("../models/Movie");

describe("Movie Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  describe("createMovie", () => {
    it("should create a new movie successfully", async () => {
      const req = { body: { title: "Test Movie", genre: "Action" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockMovie = { title: "Test Movie", genre: "Action" };
      Movie.prototype.save.mockResolvedValueOnce(mockMovie); // Mock save method

      await movieController.createMovie(req, res);

      expect(Movie.prototype.save).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenCalledWith(200); // Check if the response status is correct
      expect(res.json).toHaveBeenCalledWith(mockMovie);
    });
  });

  describe("getAllMovies", () => {
    it("should list all movies", async () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockMovies = [{ title: "Movie 1", genre: "Action" }, { title: "Movie 2", genre: "Comedy" }];
      Movie.find.mockResolvedValueOnce(mockMovies); // Mock the find method

      await movieController.getAllMovies(req, res);

      expect(Movie.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockMovies);
    });
  });

  describe("getSpecificMovie", () => {
    it("should get a specific movie", async () => {
      const req = { params: { id: "123" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockMovie = { _id: "123", title: "Test Movie", genre: "Action" };
      Movie.findById.mockResolvedValueOnce(mockMovie); // Mock the findById method

      await movieController.getSpecificMovie(req, res);

      expect(Movie.findById).toHaveBeenCalledWith("123");
      expect(res.json).toHaveBeenCalledWith(mockMovie);
    });

    it("should return 404 if movie is not found", async () => {
      const req = { params: { id: "123" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Movie.findById.mockResolvedValueOnce(null); // Mock movie not found

      await movieController.getSpecificMovie(req, res);

      expect(Movie.findById).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Movie not found" });
    });
  });

  describe("updateMovie", () => {
    it("should update a movie successfully", async () => {
      const req = { params: { id: "123" }, body: { title: "Updated Movie", genre: "Action" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockUpdatedMovie = { _id: "123", title: "Updated Movie", genre: "Action" };
      Movie.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedMovie); // Mock findByIdAndUpdate method

      await movieController.updateMovie(req, res);

      expect(Movie.findByIdAndUpdate).toHaveBeenCalledWith("123", req.body, { new: true });
      expect(res.json).toHaveBeenCalledWith(mockUpdatedMovie);
    });

    it("should return 404 if movie is not found", async () => {
      const req = { params: { id: "123" }, body: { title: "Updated Movie", genre: "Action" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Movie.findByIdAndUpdate.mockResolvedValueOnce(null); // Mock movie not found

      await movieController.updateMovie(req, res);

      expect(Movie.findByIdAndUpdate).toHaveBeenCalledWith("123", req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Movie not found" });
    });
  });

  describe("deleteMovie", () => {
    it("should delete a movie successfully", async () => {
      const req = { params: { id: "123" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockDeletedMovie = { _id: "123", title: "Test Movie" };
      Movie.findByIdAndDelete.mockResolvedValueOnce(mockDeletedMovie); // Mock findByIdAndDelete method

      await movieController.deleteMovie(req, res);

      expect(Movie.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(res.json).toHaveBeenCalledWith({ message: "Movie Deleted Successfully" });
    });

    it("should return 404 if movie is not found", async () => {
      const req = { params: { id: "123" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Movie.findByIdAndDelete.mockResolvedValueOnce(null); // Mock movie not found

      await movieController.deleteMovie(req, res);

      expect(Movie.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Movie not found" });
    });
  });
});