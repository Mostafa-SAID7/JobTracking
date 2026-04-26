-- Initial Database Migration for Job Tracking System

-- Create Templates table
CREATE TABLE [Templates] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [Category] NVARCHAR(50) NOT NULL,
    [MessageTemplate] NVARCHAR(MAX) NOT NULL,
    [CvPath] NVARCHAR(500) NOT NULL,
    [GithubUrl] NVARCHAR(500) NOT NULL,
    [PortfolioUrl] NVARCHAR(500) NOT NULL,
    [Email] NVARCHAR(255) NOT NULL,
    [CreatedAt] DATETIME2 NOT NULL,
    [UpdatedAt] DATETIME2 NOT NULL
);

-- Create Jobs table
CREATE TABLE [Jobs] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [Title] NVARCHAR(500) NOT NULL,
    [Description] NVARCHAR(MAX) NOT NULL,
    [Category] NVARCHAR(50) NOT NULL,
    [PhoneNumber] NVARCHAR(20),
    [SourceMessage] NVARCHAR(MAX) NOT NULL,
    [GeneratedMessage] NVARCHAR(MAX),
    [TemplateId] INT,
    [CreatedAt] DATETIME2 NOT NULL,
    FOREIGN KEY ([TemplateId]) REFERENCES [Templates]([Id])
);

-- Create indexes
CREATE INDEX [IX_Jobs_Category] ON [Jobs]([Category]);
CREATE INDEX [IX_Jobs_TemplateId] ON [Jobs]([TemplateId]);
CREATE INDEX [IX_Templates_Category] ON [Templates]([Category]);

-- Insert sample templates
INSERT INTO [Templates] ([Category], [MessageTemplate], [CvPath], [GithubUrl], [PortfolioUrl], [Email], [CreatedAt], [UpdatedAt])
VALUES 
(
    'Backend',
    'Hi, I am interested in the {JobTitle} position. I have extensive experience with .NET and Web APIs. You can find my work at {Github} and my portfolio at {Portfolio}. Feel free to reach out at {Email}.',
    '/cvs/backend_cv.pdf',
    'https://github.com/username',
    'https://portfolio.com',
    'your@email.com',
    GETUTCDATE(),
    GETUTCDATE()
),
(
    'Frontend',
    'Hello, I am very interested in the {JobTitle} role. I specialize in Angular and modern frontend development. Check out my projects at {Github} and {Portfolio}. Contact me at {Email}.',
    '/cvs/frontend_cv.pdf',
    'https://github.com/username',
    'https://portfolio.com',
    'your@email.com',
    GETUTCDATE(),
    GETUTCDATE()
),
(
    'Fullstack',
    'Hi there, I am excited about the {JobTitle} opportunity. I have full-stack experience with both backend and frontend technologies. Visit {Github} and {Portfolio} to see my work. Reach me at {Email}.',
    '/cvs/fullstack_cv.pdf',
    'https://github.com/username',
    'https://portfolio.com',
    'your@email.com',
    GETUTCDATE(),
    GETUTCDATE()
);
