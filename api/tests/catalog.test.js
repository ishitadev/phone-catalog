const request = require('supertest');
const mongoose = require('mongoose');
const Catalog = require('../models/Catalog')
const app = require('../app')
jest.useFakeTimers()
const _id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003')

const phone = {
    _id,
    name: "Samsung",
    manufacturer: "samsung",
    description: "lorem ipsum dolor sit amet consectetur.",
    color: "white",
    price: 133,
    screen: "5.19",
    processor: "A34 core series A",
    ram: 4,
    imageFileName: "iphone.jpg"
}

beforeEach(async () => {
    await Catalog.deleteOne({ _id });
    await new Catalog(phone).save();
})

test('Get All Phone from catalog', async () => {
    await request(app)
        .get('/phone')
        .expect(200);
})

test('Get phone from catalog by id', async () => {
    await request(app)
        .get(`/phone/${_id}`)
        .expect(200);
})

test('Get phone from catalog with wrong id', async () => {
    await request(app)
        .get(`/phone/4edd40c8673462e0fb12000003`)
        .expect(400);
})

test('Delete Phone from catalog by id', async () => {
    await request(app).
        delete(`/phone/${_id}`).
        expect(200);
})

test('Delete Phone from catalog with wrong', async () => {
    await request(app).
        delete(`/phone/4edd40c8673462e0fb12000003`).
        expect(400);
})