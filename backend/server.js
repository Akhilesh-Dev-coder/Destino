require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knex = require('knex');

const app = express();
app.use(cors());
app.use(express.json());

const db = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'travel_planner',
    },
});


// REGISTER
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    try {
        const existingUser = await db('user_creds').where({ email }).first();
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Email already registered' });
        }

        const [newUserId] = await db('user_creds').insert({
            name,
            email,
            password,
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUserId,
                name,
                email,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error occurred during registration', error: error.message });
    }
});


// LOGIN
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await db('user_creds').where({ email }).first();

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        if (user.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                name: user.name || null,
            },
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error occurred during login', error: error.message });
    }
});


const PORT = process.env.PORT || 1833;
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});