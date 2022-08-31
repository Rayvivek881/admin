const encryption = (password) => {
    let hashpass = 0, MOD = 1000000009, p = 51, curr = 1;
    for (let i = 0; i < password.length; i++) {
        hashpass = (hashpass + (password.charCodeAt(i) * curr)) % MOD;
        curr = (curr * p) % MOD;
    }
    return hashpass;
}

module.exports = encryption; 