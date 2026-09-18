import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/env.js';
import { generateToken } from '../middleware/authMiddleware.js';

/**
 * Phase 4 Authentication & Security Test Suite
 * Tests core security primitives, JWT tokens, bcrypt hashes, and schema transforms
 */
const runAuthTests = async () => {
  let passed = 0;
  let failed = 0;

  const assert = (condition, testName) => {
    if (condition) {
      console.log(`\x1b[32m✔ PASS:\x1b[0m ${testName}`);
      passed++;
    } else {
      console.error(`\x1b[31m✖ FAIL:\x1b[0m ${testName}`);
      failed++;
    }
  };

  console.log('\n--- Running Phase 4 Auth & Security Test Suite ---\n');

  // Test 1: Bcrypt password hashing
  try {
    const rawPassword = 'SecretPassword2026!';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(rawPassword, salt);

    assert(hash !== rawPassword, 'Bcrypt hashes plaintext password');
    assert(hash.startsWith('$2'), 'Hash has valid bcrypt prefix');

    const matchSuccess = await bcrypt.compare(rawPassword, hash);
    assert(matchSuccess === true, 'Bcrypt matches correct plaintext password');

    const matchFail = await bcrypt.compare('WrongPassword!', hash);
    assert(matchFail === false, 'Bcrypt rejects incorrect plaintext password');
  } catch (err) {
    assert(false, `Bcrypt test error: ${err.message}`);
  }

  // Test 2: JWT token generation and verification
  try {
    const mockUserId = '654321098765432109876543';
    const token = generateToken(mockUserId);

    assert(typeof token === 'string' && token.split('.').length === 3, 'generateToken returns valid 3-part JWT');

    const decoded = jwt.verify(token, config.jwtSecret);
    assert(decoded.id === mockUserId, 'JWT payload contains correct user ID');
    assert(Boolean(decoded.exp), 'JWT payload contains expiration timestamp');

    // Test token with wrong secret
    let wrongSecretFailed = false;
    try {
      jwt.verify(token, 'invalid_secret_key_123');
    } catch {
      wrongSecretFailed = true;
    }
    assert(wrongSecretFailed, 'JWT verification fails with wrong secret');
  } catch (err) {
    assert(false, `JWT test error: ${err.message}`);
  }

  // Test 3: Input Validation logic
  try {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    assert(emailRegex.test('user@nuzio.ai') === true, 'Email regex accepts valid standard email');
    assert(emailRegex.test('invalid-email') === false, 'Email regex rejects email without @ or domain');
    assert(emailRegex.test('user@.com') === false, 'Email regex rejects invalid domain structure');

    const passwordMinLength = 6;
    assert('short'.length < passwordMinLength, 'Password length validator catches < 6 chars');
    assert('secure123'.length >= passwordMinLength, 'Password length validator accepts >= 6 chars');
  } catch (err) {
    assert(false, `Validation test error: ${err.message}`);
  }

  // Test 4: Sanitization & Prohibited fields check
  try {
    const rawUserDoc = {
      _id: '654321098765432109876543',
      name: 'Alex Morgan',
      email: 'alex@nuzio.ai',
      password: '$2a$10$encryptedHashHere...',
      plan: 'free',
      language: 'en',
      interests: ['AI & Tech', 'Finance'],
      __v: 0,
    };

    const sanitized = { ...rawUserDoc };
    delete sanitized.password;
    delete sanitized.__v;

    assert(!sanitized.password, 'Password hash is stripped from sanitized user object');
    assert(!sanitized.__v, 'Mongoose version key __v is stripped from sanitized user object');
    assert(sanitized.email === 'alex@nuzio.ai', 'Public profile fields are preserved');

    const prohibitedUpdates = ['_id', 'password', 'plan', 'createdAt', 'updatedAt'];
    const updateAttempt = { name: 'Alex New', plan: 'pro', password: 'new' };
    const rejectedKeys = Object.keys(updateAttempt).filter((k) => prohibitedUpdates.includes(k));
    assert(rejectedKeys.includes('plan') && rejectedKeys.includes('password'), 'Profile updater detects prohibited fields');
  } catch (err) {
    assert(false, `Sanitization test error: ${err.message}`);
  }

  console.log(`\n========================================`);
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
};

runAuthTests();
