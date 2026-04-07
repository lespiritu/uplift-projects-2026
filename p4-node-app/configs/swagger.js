const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Web Invitation API",
    version: "1.0.0",
    description: "API documentation for the Web Invitation backend",
  },
  servers: [
    {
      url: "http://localhost:4502",
      description: "Local development server",
    },
  ],
  tags: [
    { name: "Auth" },
    { name: "Invitations" },
    { name: "RSVP" },
    { name: "Themes" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "token",
      },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          message: { type: "string", example: "Invalid token" },
        },
      },
      RegisterBody: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", example: "John Doe" },
          email: { type: "string", format: "email", example: "john@example.com" },
          password: { type: "string", format: "password", example: "secret123" },
        },
      },
      LoginBody: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "john@example.com" },
          password: { type: "string", format: "password", example: "secret123" },
        },
      },
      CreateInvitationBody: {
        type: "object",
        required: ["title", "eventDate", "location", "rsvpCutoffDate"],
        properties: {
          title: { type: "string", example: "Anna & Mark Wedding" },
          theme: { type: "string", example: "6798dbf6d16a5b7710c5f451" },
          message: { type: "string", example: "We would love to celebrate with you." },
          eventType: {
            type: "string",
            enum: ["wedding", "birthday", "baptism", "party", "meeting", "other"],
            example: "wedding",
          },
          eventDate: { type: "string", format: "date-time", example: "2026-06-15T09:00:00.000Z" },
          eventTime: { type: "string", example: "5:00 PM" },
          location: { type: "string", example: "Cebu City Hall" },
          googleMapLink: { type: "string", example: "https://maps.google.com/..." },
          rsvpCutoffDate: { type: "string", format: "date-time", example: "2026-06-10T00:00:00.000Z" },
        },
      },
      EditInvitationBody: {
        type: "object",
        properties: {
          title: { type: "string" },
          theme: { type: "string" },
          message: { type: "string" },
          eventType: {
            type: "string",
            enum: ["wedding", "birthday", "baptism", "party", "meeting", "other"],
          },
          eventDate: { type: "string", format: "date-time" },
          eventTime: { type: "string" },
          location: { type: "string" },
          googleMapLink: { type: "string" },
          rsvpCutoffDate: { type: "string", format: "date-time" },
        },
      },
      UpsertRsvpBody: {
        type: "object",
        required: ["name", "email", "response"],
        properties: {
          name: { type: "string", example: "Jane Guest" },
          email: { type: "string", format: "email", example: "jane@example.com" },
          response: { type: "string", enum: ["yes", "no"], example: "yes" },
          message: { type: "string", example: "Excited to attend!" },
        },
      },
      CreateThemeBody: {
        type: "object",
        required: ["name", "templateKey"],
        properties: {
          name: { type: "string", example: "Floral Gold" },
          description: { type: "string", example: "Elegant floral wedding template" },
          category: {
            type: "string",
            enum: ["birthday", "wedding", "corporate", "holiday", "other"],
            example: "wedding",
          },
          templateKey: {
            type: "string",
            enum: ["classic", "modern", "minimal", "floral", "elegant"],
            example: "floral",
          },
          colorScheme: { type: "string", example: "gold-white-green" },
        },
      },
    },
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterBody" },
            },
          },
        },
        responses: {
          201: { description: "User created" },
          400: { description: "Validation error" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginBody" },
            },
          },
        },
        responses: {
          200: { description: "Login successful" },
          401: { description: "Invalid credentials" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Logout user",
        responses: {
          200: { description: "Logged out" },
        },
      },
    },
    "/api/invitation": {
      get: {
        tags: ["Invitations"],
        summary: "Get current user's invitations",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: { description: "Invitation list" },
          401: { description: "Unauthorized" },
          500: { description: "Server error" },
        },
      },
      post: {
        tags: ["Invitations"],
        summary: "Create invitation with images",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/CreateInvitationBody" },
                  {
                    type: "object",
                    required: ["images"],
                    properties: {
                      images: {
                        type: "array",
                        items: { type: "string", format: "binary" },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        responses: {
          201: { description: "Invitation created" },
          400: { description: "Validation error" },
          401: { description: "Unauthorized" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/invitation/slug/{slug}": {
      get: {
        tags: ["Invitations"],
        summary: "Get published invitation by slug",
        parameters: [
          {
            in: "path",
            name: "slug",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Invitation found" },
          404: { description: "Invitation not found" },
          500: { description: "Server error" },
        },
      },
    },
    "/api/invitation/{invitationId}": {
      get: {
        tags: ["Invitations"],
        summary: "Get invitation by id (owner only)",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "invitationId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Invitation found" },
          401: { description: "Unauthorized" },
          404: { description: "Not found" },
        },
      },
      delete: {
        tags: ["Invitations"],
        summary: "Delete invitation (owner only)",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "invitationId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Deleted" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
          404: { description: "Not found" },
        },
      },
    },
    "/api/invitation/togglePublish/{invitationId}": {
      patch: {
        tags: ["Invitations"],
        summary: "Toggle invitation publish status",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "invitationId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Status changed" },
          401: { description: "Unauthorized" },
          404: { description: "Not found" },
        },
      },
    },
    "/api/invitation/changeImages/{invitationId}": {
      patch: {
        tags: ["Invitations"],
        summary: "Replace invitation images",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "invitationId",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["images"],
                properties: {
                  images: {
                    type: "array",
                    items: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Images updated" },
          400: { description: "No images uploaded" },
          401: { description: "Unauthorized" },
          404: { description: "Not found" },
        },
      },
    },
    "/api/invitation/edit/{invitationId}": {
      put: {
        tags: ["Invitations"],
        summary: "Edit invitation",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "invitationId",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EditInvitationBody" },
            },
          },
        },
        responses: {
          200: { description: "Updated" },
          400: { description: "Validation error" },
          401: { description: "Unauthorized" },
          404: { description: "Not found" },
        },
      },
    },
    "/api/rsvp/{invitationId}": {
      put: {
        tags: ["RSVP"],
        summary: "Create or update RSVP by email (public)",
        parameters: [
          {
            in: "path",
            name: "invitationId",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpsertRsvpBody" },
            },
          },
        },
        responses: {
          200: { description: "RSVP updated" },
          201: { description: "RSVP created" },
          400: { description: "Validation error" },
          403: { description: "RSVP disabled/closed" },
          404: { description: "Invitation not found" },
        },
      },
      get: {
        tags: ["RSVP"],
        summary: "Get all RSVP records for invitation (owner only)",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "invitationId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "RSVP list with summary" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
        },
      },
    },
    "/api/rsvp/yes/{invitationId}": {
      get: {
        tags: ["RSVP"],
        summary: "Get only YES RSVPs",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "invitationId",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "YES RSVP list" },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/api/themes": {
      post: {
        tags: ["Themes"],
        summary: "Create theme (admin only)",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateThemeBody" },
            },
          },
        },
        responses: {
          201: { description: "Theme created" },
          401: { description: "Unauthorized" },
          403: { description: "Admin only" },
        },
      },
    },
    "/api/themes/admin": {
      get: {
        tags: ["Themes"],
        summary: "Get all themes (admin only)",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: { description: "Theme list" },
          401: { description: "Unauthorized" },
          403: { description: "Admin only" },
        },
      },
    },
    "/api/themes/admin/inactive": {
      get: {
        tags: ["Themes"],
        summary: "Get inactive themes (admin only)",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        responses: {
          200: { description: "Inactive themes list" },
          401: { description: "Unauthorized" },
          403: { description: "Admin only" },
        },
      },
    },
    "/api/themes/active": {
      get: {
        tags: ["Themes"],
        summary: "Get active themes (public)",
        responses: {
          200: { description: "Active themes list" },
        },
      },
    },
    "/api/themes/activate/{themeId}": {
      put: {
        tags: ["Themes"],
        summary: "Activate theme + upload preview image (admin only)",
        security: [{ bearerAuth: [] }, { cookieAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "themeId",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["previewImage"],
                properties: {
                  previewImage: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Theme activated" },
          400: { description: "No image uploaded" },
          401: { description: "Unauthorized" },
          403: { description: "Admin only" },
          404: { description: "Theme not found" },
        },
      },
    },
  },
};

export default swaggerSpec;
