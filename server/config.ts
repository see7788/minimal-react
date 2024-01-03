import { PoolOptions } from 'mysql2/promise';
export const express = (function () {
    const port = 2022;
    const path = "/e";
    return {
        port, path, url: `http://localhost:${port}${path}`
    }
})();
export const mqttServer={
    port:2023
}
export const mysql: PoolOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '15801580543',
    database: 'ed',
};