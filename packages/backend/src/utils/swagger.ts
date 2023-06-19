// Swagger Docs
import swgDocs from "swagger-jsdoc";
import { defaultSubjects } from "../data";

const swaggerDocs = swgDocs({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Highschool Site App API",
      version: "1.0.0",
      contact: {
        email: "andreicomanescuonline@gmail.com",
        name: "axense234",
        url: "https://github.com/axense234",
      },
      description:
        "The documentation for the Highschool Site App API using swagger-ui-express and swagger-jsdoc.",
      license: {
        name: "GNU",
        url: "https://github.com/axense234/Highschool-Site-App/blob/master/LICENSE.md",
      },
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 4000}` }],
    components: {
      schemas: {
        Absence: {
          properties: {
            card_section_id: {
              type: "string",
            },
            date: {
              type: "string",
            },
            reasoned: {
              type: "bool",
            },
          },
        },
        Admin: {
          properties: {
            username: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
              format: "password",
            },
          },
        },
        Announcement: {
          properties: {
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            category: {
              type: "string",
              enum: ["GENERALE", "SPECIALE", "PROFESORI", "ELEVI"],
            },
            img_url: {
              type: "string",
              format: "url",
            },
            video_url: {
              type: "string",
              format: "url",
            },
            video_pozition: {
              type: "string",
              enum: ["INCEPUT", "FINAL"],
            },
          },
        },
        Auth: {
          properties: {
            password: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
          },
        },
        User: {
          properties: {
            profile_img_url: {
              type: "string",
            },
            username: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
            },
            subject: {
              type: "string",
              enum: defaultSubjects,
            },
            description: {
              type: "string",
            },
          },
        },
        StudentCard: {
          properties: {
            student_uid: {
              type: "string",
            },
          },
        },
        CardSection: {
          properties: {
            student_card_uid: {
              type: "string",
            },
            subject: {
              type: "string",
              enum: defaultSubjects,
            },
          },
        },
        Catalogue: {
          properties: {
            label: {
              type: "string",
            },
          },
        },
        Email: {
          properties: {
            emailAddress: {
              type: "string",
              format: "email",
            },
            subject: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
        },
        Grade: {
          properties: {
            value: {
              type: "number",
              min: 1,
              max: 10,
            },
            card_section_uid: {
              type: "string",
            },
          },
        },
        Student: {
          properties: {
            username: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
            },
          },
        },
        Teacher: {
          properties: {
            username: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
            },
            description: {
              type: "string",
            },
          },
        },
        Book: {
          properties: {
            title: {
              type: "string",
            },
            author: {
              type: "string",
            },
            pdf_file_url: {
              type: "string",
            },
            description: {
              type: "string",
            },
            created_by_teacher_uid: {
              type: "string",
            },
            created_by_admin_uid: {
              type: "string",
            },
          },
        },
        Class: {
          properties: {
            label: {
              type: "string",
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        scheme: "bearer",
        in: "header",
        name: "Authorization",
      },
    },
  },
  apis: ["./src/docs/*.yaml"],
});

export default swaggerDocs;
