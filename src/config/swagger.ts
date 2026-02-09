import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'The Perfect Mentor API',
      version: '1.0.0',
      description:
        'Documentación de la API para la plataforma The Perfect Mentor',
      contact: {
        name: 'Soporte API',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}/api`,
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT de autenticación de Firebase',
        },
      },
      schemas: {
        UserList: {
          type: 'object',
          properties: {
            users: {
              type: 'array',
              items: { $ref: '#/components/schemas/User' },
            },
            page: {
              type: 'number',
              example: 1,
              description: 'Número de página',
            },
            perPage: {
              type: 'number',
              example: 7,
              description: 'Cantidad de elementos por página',
            },
            total: {
              type: 'number',
              example: 3,
              description: 'Total de elementos',
            },
            totalPages: {
              type: 'number',
              example: 1,
              description: 'Total de páginas',
            },
            isScrolling: {
              type: 'boolean',
              example: false,
              description:
                'Condición para la páginación(se utiliza en version mobile)',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Identificador único del usuario',
            },
            id: {
              type: 'string',
              description: 'Identificador único del usuario desde firebase',
            },
            username: {
              type: 'string',
              description: 'Nombre de usuario',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del usuario',
            },
            fullname: {
              type: 'string',
              description: 'Nombre completo del usuario',
            },
            name: { type: 'string', description: 'Nombre del usuario' },
            lastname: { type: 'string', description: 'Apellido del usuario' },
            avatar: {
              type: 'string',
              description: 'URL de la imagen del avatar',
            },
            role: {
              type: 'string',
              enum: ['MENTEE', 'MENTOR'],
              description: 'Rol del usuario',
            },
            active: {
              type: 'boolean',
              description: 'Estado de activación de la cuenta',
            },
          },
        },
        CreatedUser: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Identificador único del usuario',
            },
            id: {
              type: 'string',
              description: 'Identificador único del usuario desde firebase',
            },
            username: {
              type: 'string',
              description: 'Nombre de usuario',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del usuario',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Id del usuario inválido',
              description: 'Mensaje de error',
            },
            error: {
              type: 'boolean',
              description: 'Indicador de error',
            },
          },
        },
        ErrorAuth: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'No autorizado. Formato de token inválido',
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User',
            },
            token: {
              type: 'string',
              description: 'Token de autenticación JWT',
            },
          },
        },
        Role: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Identificador único del rol',
            },
            name: {
              type: 'string',
              description: 'Nombre del rol',
            },
            description: {
              type: 'string',
              description: 'Descripción del rol',
            },
          },
        },
        Report: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Identificador único del reporte',
            },
            senderId: {
              type: 'string',
              description: 'ID del usuario que creó el reporte',
            },
            receiverId: {
              type: 'string',
              description: 'ID del usuario reportado',
            },
            subject: {
              type: 'string',
              description: 'Asunto/título del reporte',
            },
            content: {
              type: 'string',
              description: 'Contenido/detalles del reporte',
            },
            status: {
              type: 'string',
              enum: ['pending', 'resolved', 'rejected'],
              description: 'Estado del reporte',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del reporte',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización del reporte',
            },
          },
        },
        ReportMessage: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Identificador único del mensaje',
            },
            reportId: {
              type: 'string',
              description: 'ID del reporte asociado',
            },
            authorId: {
              type: 'string',
              description: 'ID del autor del mensaje',
            },
            content: {
              type: 'string',
              description: 'Contenido del mensaje',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del mensaje',
            },
          },
        },
        ChatItem: {
          type: 'object',
          properties: {
            lastMessage: {
              $ref: '#/components/schemas/Message',
            },
            unreadCount: {
              type: 'integer',
              example: 1,
            },
            contact: {
              $ref: '#/components/schemas/UserMinimal',
            },
          },
        },
        Message: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6989f4631f3be9214ea365e2' },
            senderId: { type: 'string', example: '69791f41ab42c2a3e29a13e6' },
            receiverId: { type: 'string', example: '69791eefab42c2a3e29a13c7' },
            content: {
              type: 'string',
              example: 'Vamos a testear desde swagger',
            },
            read: { type: 'boolean', example: false },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            chatPartner: {
              type: 'string',
              example: '69791f41ab42c2a3e29a13e6',
            },
          },
        },
        MessageList: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '6989f4631f3be9214ea365e2' },
            senderId: { type: 'string', example: '69791f41ab42c2a3e29a13e6' },
            receiverId: { type: 'string', example: '69791eefab42c2a3e29a13c7' },
            content: {
              type: 'string',
              example: 'Vamos a testear desde swagger',
            },
            read: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Match: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Identificador único del match',
            },
            fullname: {
              type: 'string',
              description: 'Nombre completo del usurio vinculado',
            },
          },
        },
        MatchesResponse: {
          type: 'object',
          properties: {
            sentByMe: {
              type: 'array',
              items: { $ref: '#/components/schemas/MatchDetail' },
            },
            receivedByMe: {
              type: 'array',
              items: { $ref: '#/components/schemas/MatchDetail' },
            },
          },
        },
        MatchDetail: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '6981fb6e696d5e60e1b28e28',
            },
            senderId: {
              $ref: '#/components/schemas/UserMinimal',
            },
            receiverId: {
              $ref: '#/components/schemas/UserMinimal',
            },
            status: {
              type: 'string',
              enum: ['pending', 'accepted', 'rejected'],
              example: 'pending',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        UserMinimal: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '6981f628e2e3744a2520e159',
            },
            fullname: {
              type: 'string',
              example: 'John Doe',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
