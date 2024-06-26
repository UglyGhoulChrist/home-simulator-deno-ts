class Log {
    static readonly reset = '\x1b[0m';

    static readonly bgWhite = '\x1b[47m'; // console.log()
    static readonly bgYellow = '\x1b[43m'; // console.warn()
    static readonly bgRed = '\x1b[41m'; // console.error()

    static log(message: string): void {
        console.log(`${this.bgWhite}${message}${this.reset}`);
    }

    static warn(message: string): void {
        console.log(`${this.bgYellow}${message}${this.reset}`);
    }

    static error(message: string): void {
        console.log(`${this.bgRed}${message}${this.reset}`);
    }

    // Day, House info
    static dim(message: string): void {
        console.log(`\x1b[2m${message}${this.reset}`);
    }

    // Wife act, info
    static magenta(message: string): void {
        console.log(`\x1b[35m${message}${this.reset}`);
    }

    // Husband act, info
    static blue(message: string): void {
        console.log(`\x1b[34m${message}${this.reset}`);
    }

    // Child act, info
    static green(message: string): void {
        console.log(`\x1b[32m${message}${this.reset}`);
    }

    // Cat act, info
    static yellow(message: string): void {
        console.log(`\x1b[33m${message}${this.reset}`);
    }

    static red(message: string): void {
        console.log(`\x1b[31m${message}${this.reset}`);
    }
}
