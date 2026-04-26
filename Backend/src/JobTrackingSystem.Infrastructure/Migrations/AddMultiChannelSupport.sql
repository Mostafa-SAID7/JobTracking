-- Migration: Add Multi-Channel Support (OCR + Email)

-- Add new columns to Templates table
ALTER TABLE [Templates] ADD
    [EmailSubjectTemplate] NVARCHAR(500),
    [EmailBodyTemplate] NVARCHAR(MAX);

-- Add new columns to Jobs table
ALTER TABLE [Jobs] ADD
    [Email] NVARCHAR(255),
    [ImagePath] NVARCHAR(500),
    [ApplicationChannel] NVARCHAR(50) DEFAULT 'Manual',
    [EmailSentAt] DATETIME2,
    [EmailStatus] NVARCHAR(50);

-- Create OcrResults table
CREATE TABLE [OcrResults] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [JobId] INT NOT NULL,
    [ExtractedText] NVARCHAR(MAX) NOT NULL,
    [Confidence] DECIMAL(5,2) NOT NULL,
    [ProcessedAt] DATETIME2 NOT NULL,
    FOREIGN KEY ([JobId]) REFERENCES [Jobs]([Id]) ON DELETE CASCADE
);

-- Create EmailLogs table
CREATE TABLE [EmailLogs] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [JobId] INT NOT NULL,
    [RecipientEmail] NVARCHAR(255) NOT NULL,
    [Subject] NVARCHAR(500) NOT NULL,
    [Status] NVARCHAR(50) NOT NULL,
    [ErrorMessage] NVARCHAR(MAX),
    [SentAt] DATETIME2 NOT NULL,
    FOREIGN KEY ([JobId]) REFERENCES [Jobs]([Id]) ON DELETE CASCADE
);

-- Create indexes for new columns
CREATE INDEX [IX_Jobs_Email] ON [Jobs]([Email]);
CREATE INDEX [IX_Jobs_ApplicationChannel] ON [Jobs]([ApplicationChannel]);
CREATE INDEX [IX_Jobs_EmailStatus] ON [Jobs]([EmailStatus]);
CREATE INDEX [IX_OcrResults_JobId] ON [OcrResults]([JobId]);
CREATE INDEX [IX_EmailLogs_JobId] ON [EmailLogs]([JobId]);
CREATE INDEX [IX_EmailLogs_Status] ON [EmailLogs]([Status]);

-- Update existing templates with default email templates
UPDATE [Templates] SET
    [EmailSubjectTemplate] = 'Application for {JobTitle}',
    [EmailBodyTemplate] = 'Hi, I am interested in the {JobTitle} position. I have experience with {Category} development. You can find my work at {Github} and my portfolio at {Portfolio}. Feel free to reach out at {Email}.'
WHERE [EmailSubjectTemplate] IS NULL;

-- Add sample data for new template fields
INSERT INTO [Templates] ([Category], [MessageTemplate], [EmailSubjectTemplate], [EmailBodyTemplate], [CvPath], [GithubUrl], [PortfolioUrl], [Email], [CreatedAt], [UpdatedAt])
SELECT 
    [Category],
    [MessageTemplate],
    'Application for {JobTitle}',
    'Hi, I am interested in the {JobTitle} position. I have experience with {Category} development. You can find my work at {Github} and my portfolio at {Portfolio}. Feel free to reach out at {Email}.',
    [CvPath],
    [GithubUrl],
    [PortfolioUrl],
    [Email],
    GETUTCDATE(),
    GETUTCDATE()
FROM [Templates]
WHERE [Category] NOT IN (SELECT [Category] FROM [Templates] WHERE [EmailSubjectTemplate] IS NOT NULL);
