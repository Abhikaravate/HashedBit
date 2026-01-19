const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '2021', 
    database: 'HashedBit'
};

app.post('/api/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        
        const [existing] = await connection.execute('SELECT email FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
        }

        await connection.execute(
            'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)',
            [fullName, email, password]
        );

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error during registration" });
    } finally {
        if (connection) await connection.end();
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);

        const [users] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(404).json({ message: "User not found" });

        const user = users[0];

       
        if (user.is_locked) {
            await connection.execute(
                'INSERT INTO login_attempts (user_id, ip_address, status) VALUES (?, ?, ?)',
                [user.user_id, ipAddress, 'LOCKED']
            );
            return res.status(403).json({ message: "Account is locked." });
        }

       
        if (user.password !== password) {
            const newFailedAttempts = user.failed_attempts + 1;
            
            
            if (newFailedAttempts > 4) { 
                await connection.execute(
                    'UPDATE users SET failed_attempts = ?, is_locked = TRUE WHERE user_id = ?',
                    [newFailedAttempts, user.user_id]
                );
                await connection.execute(
                    'INSERT INTO login_attempts (user_id, ip_address, status) VALUES (?, ?, ?)',
                    [user.user_id, ipAddress, 'LOCKED']
                );
                
                return res.status(403).json({ message: "Account locked after 4 failed attempts." });
            } else {
                await connection.execute(
                    'UPDATE users SET failed_attempts = ? WHERE user_id = ?',
                    [newFailedAttempts, user.user_id]
                );
                await connection.execute(
                    'INSERT INTO login_attempts (user_id, ip_address, status) VALUES (?, ?, ?)',
                    [user.user_id, ipAddress, 'FAILED']
                );
                return res.status(401).json({ 
                    message: "Invalid password", 
                   
                    remaining: 4 - newFailedAttempts 
                });
            }
           
        }

        
        await connection.execute(
            'UPDATE users SET failed_attempts = 0, is_locked = FALSE WHERE user_id = ?',
            [user.user_id]
        );
        await connection.execute(
            'INSERT INTO login_attempts (user_id, ip_address, status) VALUES (?, ?, ?)',
            [user.user_id, ipAddress, 'SUCCESS']
        );

        res.status(200).json({ message: "Login Successful", user: user.full_name });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    } finally {
        if (connection) await connection.end();
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));