const request = require('supertest');
const User = require('../models/User');
const app = require('../app');

describe('User Routes', () => {

  let testUser = {};
  const testUsersIds = [];

  beforeAll(async () => {
    // server = app.listen(PORT, () => {
    //   console.log('Test server running on port 3000');
    // });
    // Create test user
    testUser = new User({
      name: 'TestUser',
      age: 30,
      email: 'test.user@example.com',
      interests: 'test data',
      address: 300,
    });

    // Save test user
    await testUser.save();

    // Save test user id
    testUsersIds.push(testUser._id.toString());
  });
  afterAll(async () => {
    // Delete test users
    await User.deleteMany({ _id: {$in:testUsersIds} });

    // server.close();
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(
        {
          data: expect.any(Array),
          total: expect.any(Number),
          page: expect.any(Number),
          per_page: expect.any(Number),
        }
      );
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: 'TestNewUser',
          age: 30,
          email: 'test.new.user@example.com',
          interests: 'test data',
          address: 300,
        });
      expect(response.status).toBe(201);
      expect(typeof response.body).toBe('object');
      // Save new test user id
      testUsersIds.push(response.body._id)
    });

    it('should return 400 bad request for missing fields', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'TestNewUser' });
      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a single user', async () => {
      const response = await request(app).get(`/api/users/${testUser._id}`);
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
    });

    it('should return 404 not found for unexistent id', async () => {
      const response = await request(app).get('/api/users/507f1f77bcf86cd799439011');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update an existing user', async () => {
      const response = await request(app)
        .put(`/api/users/${testUser._id}`)
        .send({
          name: 'Updated TestUser',
        });
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
    });

    it('should return 404 not found for unexistent id', async () => {
      const response = await request(app)
        .put('/api/users/507f1f77bcf86cd799439011')
        .send({ name: 'Updated TestUser' });
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      const response = await request(app).delete(`/api/users/${testUser._id}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User deleted successfully');

      // Verify the user is removed from the database
      const deletedUser = await User.findById(testUser._id);
      expect(deletedUser).toBeNull();
    });

    it('should return 500 internal server error for invalid id', async () => {
      const response = await request(app).delete('/api/users/invalid-id');
      expect(response.status).toBe(500);
    });
  });

});
