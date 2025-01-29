import { Request } from 'express';
import { Document } from 'mongoose';

// Extend the Request interface to include a user property
declare global {
    namespace Express {
        interface Request {
            user?: Document; // Use Document type from mongoose to represent a user document
            id?: string; // Add the id property with an optional string type
        }
    }
}

export {}; // This file is a module that augments the global namespace
