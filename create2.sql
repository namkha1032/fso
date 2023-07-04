/*
########### XÓA DATABASE CŨ TẠO DATABASE MỚI (LƯỜI XÓA TỪNG CONSTRAINT) ##########
*/
-- USE master
-- -- GO

-- IF EXISTS (
--     SELECT [name]
--         FROM sys.databases
--         WHERE [name] = N'RecruitmentWeb'
-- )
-- DROP DATABASE RecruitmentWeb
-- -- GO

-- -- Create a new database called 'RecruitmentWeb'
-- -- Connect to the 'master' database to run this snippet
-- USE master
-- -- GO
-- -- Create the new database if it does not exist already
-- IF NOT EXISTS (
--     SELECT [name]
--         FROM sys.databases
--         WHERE [name] = N'RecruitmentWeb'
-- )
-- CREATE DATABASE RecruitmentWeb
-- -- GO

-- use RecruitmentWeb
-- go

/*
############# TẠO CÁC BẢNG ENTITY #############
*/

-- Create a new table called '[role]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[WebRole]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [WebRole];
-- GO
-- Create the table in the specified schema
CREATE TABLE [WebRole]
(
    [WebRoleId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [WebRoleName] NVARCHAR(255),
    [isDeleted] BIT NOT NULL DEFAULT 0
    -- Specify more columns here
);
-- GO

-- Create a new table called '[User]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[WebUser]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [WebUser];
-- GO
-- Create the table in the specified schema
CREATE TABLE [WebUser]
(
    [WebUserId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [WebRoleId] UNIQUEIDENTIFIER NOT NULL,
    [WebUserName] NVARCHAR(255),
    [Password] NVARCHAR(255) NOT NULL,
    [WebUserAddress] NVARCHAR(255) NOT NULL,
    [WebUserEmail] NVARCHAR(255) NOT NULL,
    [WebUserPhone] VARCHAR(40) NOT NULL,
    [WebUserImage] VARBINARY(255) NOT NULL,
    [isDeleted] BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_UserRole FOREIGN KEY (WebRoleId) REFERENCES WebRole(WebRoleId)
    --- thêm thuộc tính
);
-- GO

-- Create a new table called '[Candidate]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Candidate]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Candidate];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Candidate]
(
    [CandidateId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [Experience] NVARCHAR(255),
    [isDeleted] BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_CandidateUser FOREIGN KEY (UserId) REFERENCES WebUser(WebUserId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Interviewer]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Interviewer]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Interviewer];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Interviewer]
(
    [InterviewerId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [DepartmentId] UNIQUEIDENTIFIER NOT NULL,
    [isDeleted] BIT NOT NULL DEFAULT 0,

    CONSTRAINT Fk_InterviewerUser FOREIGN KEY (UserId) REFERENCES WebUser(WebUserId),
    CONSTRAINT Fk_interDepart FOREIGN KEY (DepartmentId) REFERENCES Department(DepartmentId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Recruiter]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Recruiter]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Recruiter];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Recruiter]
(
    [RecruiterId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [DepartmentId] UNIQUEIDENTIFIER NOT NULL,
    [isDeleted] BIT NOT NULL DEFAULT 0,

    CONSTRAINT FK_ReccerUser FOREIGN KEY (UserId) REFERENCES WebUser(WebUserId),
    CONSTRAINT Fk_reccerDepart FOREIGN KEY (DepartmentId) REFERENCES Department(DepartmentId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Department]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Department]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Department];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Department]
(
    [DepartmentId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [DepartmentName] NVARCHAR(255) NOT NULL
    ,[Address] NVARCHAR(255),
    [Email] NVARCHAR(255),
    [Phone] VARCHAR(40),
    [Website] NVARCHAR(255),
    [isDeleted] BIT NOT NULL DEFAULT 0
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Position]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Position]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Position];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Position]
(
    [PositionId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column,
    [PositionName] NVARCHAR(255),
    [Description] NVARCHAR(255) NULL,
    [Salary] DECIMAL NULL,
    [255HiringQty] INT NOT NULL,
    [StartDate] DATE,
    [EndDate] DATE,
    [DepartmentId] UNIQUEIDENTIFIER NOT NULL,
    [LanguageId] UNIQUEIDENTIFIER NOT NULL,
    [RecruiterId] UNIQUEIDENTIFIER NOT NULL,
    [isDeleted] BIT NOT NULL DEFAULT 0,

    CONSTRAINT FK_Hires FOREIGN KEY (DepartmentId) REFERENCES Department(DepartmentId),
    CONSTRAINT FK_ManagedBy FOREIGN KEY (RecruiterId) REFERENCES Recruiter(RecruiterId),
    CONSTRAINT CheckDate CHECK (EndDate >= StartDate),
    CONSTRAINT Fk_language FOREIGN KEY (LanguageId) REFERENCES Language(LanguageId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Language]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Language]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Language];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Language]
(
    [LanguageId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [LanguageName] NVARCHAR(255) NOT NULL,
    [isDeleted] BIT NOT NULL DEFAULT 0
    -- Specify more columns here
);
-- GO

-- Create a new table called '[CV]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[CV]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [CV];
-- GO
-- Create the table in the specified schema
CREATE TABLE [CV]
(
    [CVId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [CandidateId] UNIQUEIDENTIFIER NOT NULL,
    [Experience] NVARCHAR(255),
    [CVpdf] VARBINARY(255),
    [isDeleted] BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_CreateCV FOREIGN KEY (CandidateId) REFERENCES Candidate(CandidateId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[CV_Skills]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[CV_Skills]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [CV_has_Skills];
-- GO
-- Create the table in the specified schema
CREATE TABLE [CV_has_Skills]
(
    [CV_SkillsId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [CVId] UNIQUEIDENTIFIER NOT NULL,
    [SkillId] UNIQUEIDENTIFIER NOT NULL,
    [ExperienceYear] INT DEFAULT 0,
    CONSTRAINT FK_ofCV FOREIGN KEY (CVId) REFERENCES CV(CVId),
    CONSTRAINT FK_hasSkill FOREIGN KEY (SkillId) REFERENCES Skill(SkillId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Certificate]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Certificate]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Certificate];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Certificate]
(
    [CertificateId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [CertificateName] NVARCHAR(255) NOT NULL,
    [Description] NVARCHAR(255),
    [OrganizationName] NVARCHAR(255),
    [DateEarned] DATE NOT NULL,
    [ExpirationDate] DATE NULL,
    [Link] NVARCHAR(255) NULL,
    [CVId] UNIQUEIDENTIFIER NOT NULL,
    [isDeleted] BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_CertificateInCV FOREIGN KEY (CVId) REFERENCES CV(CVId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[BlackList]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[BlackList]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [BlackList];
-- GO
-- Create the table in the specified schema
CREATE TABLE [BlackList]
(
    [BlackListId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [CandidateId] UNIQUEIDENTIFIER NOT NULL,
    [Reason] NVARCHAR(255),
    [DateTime] DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    [Status] INT NULL,
    [isDeleted] BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_CandiInBlackList FOREIGN KEY (CandidateId) REFERENCES Candidate(CandidateId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Skill]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Skill]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Skill];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Skill]
(
    [SkillId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [SkillName] NVARCHAR(255) NOT NULL,
    [Description] NVARCHAR(255) NULL,
    [isDeleted] BIT NOT NULL DEFAULT 0
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Result]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Result]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Result];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Result]
(
    [ResultId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [ResultString] NVARCHAR(255),
    [isDeleted] BIT NOT NULL DEFAULT 0
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Report]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Report]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Report];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Report]
(
    [ReportId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [ReportName] NVARCHAR(255),
    [RecruiterId] UNIQUEIDENTIFIER NOT NULL,
    [isDeleted] BIT NOT NULL DEFAULT 0,

    CONSTRAINT FK_ReccerCreateReport FOREIGN KEY (RecruiterId) REFERENCES Recruiter(RecruiterId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Event]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Event]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Event];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Event]
(
    [EventId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [EventName] NVARCHAR(255) NOT NULL,
    [RecruiterId] UNIQUEIDENTIFIER NOT NULL,
    [isDeleted] BIT NOT NULL DEFAULT 0,

    CONSTRAINT FK_EventManagedBy FOREIGN KEY (RecruiterId) REFERENCES Recruiter(RecruiterId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Interview]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Interview]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Interview];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Interview]
(
    [InterviewId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    -- [PositionId] UNIQUEIDENTIFIER NOT NULL,
    [InterviewerId] UNIQUEIDENTIFIER NOT NULL,
    -- [CandidateId] UNIQUEIDENTIFIER NOT NULL,
    [RecruiterId] UNIQUEIDENTIFIER NOT NULL,
    [ApplicationId] UNIQUEIDENTIFIER NOT NULL,
    -- [CVId] UNIQUEIDENTIFIER NOT NULL,
    [ITRSInterviewId] UNIQUEIDENTIFIER,
    [Status] NVARCHAR(255) null,
    [Notes] NVARCHAR(255) null,
    [isDeleted] BIT NOT NULL DEFAULT 0,

    CONSTRAINT FK_IsConductes FOREIGN KEY (InterviewerId) REFERENCES Interviewer(InterviewerId),
    CONSTRAINT FK_ReccerCreateInterview FOREIGN KEY (RecruiterId) REFERENCES Recruiter(RecruiterId),
    CONSTRAINT FK_ITRS FOREIGN KEY (ITRSInterviewId) REFERENCES ITRSInterview(ITRSInterviewId),
    CONSTRAINT FK_applicationInterview FOREIGN KEY (ApplicationId) REFERENCES Application(ApplicationId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Requirements]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Requirements]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Requirements];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Requirements]
(
    [RequirementId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [PositionId] UNIQUEIDENTIFIER NOT NULL,
    [SkillId] UNIQUEIDENTIFIER NOT NULL,
    [Experience] UNIQUEIDENTIFIER NOT NULL,
    [Notes] NVARCHAR(255) NULL,
    [isDeleted] BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_requePos FOREIGN KEY (PositionId) REFERENCES Position(PositionId),
    CONSTRAINT FK_requeSkil FOREIGN KEY (SkillId) REFERENCES Skill(SkillId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Application]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Application]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Application];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Application]
(
    [ApplicationId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [CandidateId] UNIQUEIDENTIFIER NOT NULL,
    [CVId] UNIQUEIDENTIFIER NOT NULL,
    [PositionId] UNIQUEIDENTIFIER NOT NULL,
    [DateTime] DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    [Status] NVARCHAR(255), -- enum
    [Priority] BIT NULL,
    [isDeleted] BIT NOT NULL DEFAULT 0,

    CONSTRAINT Fk_appliCandidate FOREIGN KEY (CandidateId) REFERENCES Candidate(CandidateId),
    CONSTRAINT Fk_appliCv FOREIGN KEY (CVId) REFERENCES CV(CVId),
    CONSTRAINT Fk_appliPosition FOREIGN KEY (PositionId) REFERENCES Position(PositionId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Shift]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Shift]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Shift];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Shift]
(
    [ShiftId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [ShiftTimeStart] INT NOT NULL,
    [ShiftTimeEnd] INT NOT NULL,

    CHECK (ShiftTimeEnd > ShiftTimeStart)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[ITRS-Interview]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[ITRSInterview]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [ITRSInterview];
-- GO
-- Create the table in the specified schema
CREATE TABLE [ITRSInterview]
(
    [ITRSInterviewId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [DateInterview] DATE NOT NULL,
    [ShiftId] UNIQUEIDENTIFIER NOT NULL,
    [RoomId] UNIQUEIDENTIFIER NOT NULL,

    CONSTRAINT UNIQUE_InterviewTime UNIQUE (DateInterview, ShiftId, RoomId),
    CONSTRAINT Fk_ITRS_Shift FOREIGN KEY (ShiftId) REFERENCES Shift(ShiftId),
    CONSTRAINT Fk_ITRS_Room FOREIGN KEY (RoomId) REFERENCES Room(RoomId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Room]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Room]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Room];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Room]
(
    [RoomId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [RoomName] NVARCHAR(255) UNIQUE NOT NULL
    -- Specify more columns here
);
-- GO

-- Create a new table called '[CategoryQuestion]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[CategoryQuestion]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [CategoryQuestion];
-- GO
-- Create the table in the specified schema
CREATE TABLE [CategoryQuestion]
(
    [CategoryQuestionId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [CategoryQuestionName] NVARCHAR(255),
    [Weight] FLOAT NOT NULL,

    Check ([Weight] > 0)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[Question]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Question]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Question];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Question]
(
    [QuestionId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [QuestionString] NVARCHAR(255) not null,
    [CategoryQuestionId] UNIQUEIDENTIFIER NOT NULL,

    CONSTRAINT Fk_catQues FOREIGN KEY (CategoryQuestionId) REFERENCES CategoryQuestion(CategoryQuestionId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[QuestionSkills]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[QuestionSkills]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [QuestionSkills];
-- GO
-- Create the table in the specified schema
CREATE TABLE [QuestionSkills]
(
    [QuestionSkillsId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [QuestionId] UNIQUEIDENTIFIER NOT NULL,
    [SkillId] UNIQUEIDENTIFIER NOT NULL,

    UNIQUE(QuestionId, SkillId),

    CONSTRAINT Fk_SkillQues FOREIGN KEY (QuestionId) REFERENCES Question(QuestionId),
    CONSTRAINT Fk_QuesSkill FOREIGN KEY (SkillId) REFERENCES Skill(SkillId)

    -- Specify more columns here
);
-- GO

-- Create a new table called '[Round]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[Round]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [Round];
-- GO
-- Create the table in the specified schema
CREATE TABLE [Round]
(
    [RoundId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [InterviewId] UNIQUEIDENTIFIER NOT NULL,
    [QuestionId] UNIQUEIDENTIFIER NOT NULL,
    [Score] FLOAT NULL,

    Check (Score >= 0),
    Check (Score <= 10),

    CONSTRAINT Fk_RoundInterview FOREIGN KEY (InterviewId) REFERENCES Interview(InterviewId),
    CONSTRAINT Fk_RoundQuestion FOREIGN KEY (QuestionId) REFERENCES Question(QuestionId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[SuccessfulCadidate]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[SuccessfulCadidate]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [SuccessfulCadidate];
-- GO
-- Create the table in the specified schema
CREATE TABLE [SuccessfulCadidate]
(
    [SuccessfulCadidateId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [PositionId] UNIQUEIDENTIFIER NOT NULL,
    [CandidateId] UNIQUEIDENTIFIER NOT NULL,
    [DateSuccess] DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    [isDeleted] BIT NOT NULL DEFAULT 0,

    CONSTRAINT FK_SuccessfulPosition FOREIGN KEY (PositionId) REFERENCES Position(PositionId),
    CONSTRAINT FK_SuccessfulCandi FOREIGN KEY (CandidateId) REFERENCES Candidate(CandidateId)
    -- Specify more columns here
);
-- GO

-- Create a new table called '[CandidateJoinEvent]' in schema '[main]'
-- Drop the table if it already exists
-- IF OBJECT_ID('[CandidateJoinEvent]', 'U') IS NOT NULL
DROP TABLE IF EXISTS [CandidateJoinEvent];
-- GO
-- Create the table in the specified schema
CREATE TABLE [CandidateJoinEvent]
(
    [CandidateJoinEventId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Primary Key column
    [CandidateId] UNIQUEIDENTIFIER NOT NULL,
    [EventId] UNIQUEIDENTIFIER NOT NULL,
    [DateJoin] DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (CandidateId, EventId, DateJoin),
    CONSTRAINT FK_CandiJoin FOREIGN KEY (CandidateId) REFERENCES Candidate(CandidateId),
    CONSTRAINT FK_joinEvent FOREIGN KEY (EventId) REFERENCES Event(EventId)
    -- Specify more columns here
);
-- GO

-- ################################################################################

-- Constraint FK
-- User role
-- ALTER TABLE WebUser ADD ;

-- Web user role
-- ALTER TABLE Candidate ADD 
-- ALTER TABLE Interviewer ADD 
-- ALTER TABLE Recruiter ADD 

-- Candidate create CV
-- ALTER TABLE CV ADD ;
-- Certificate in CV
-- ALTER TABLE Certificate ADD ;

-- Requirements skill
-- ALTER TABLE Requirements ADD ;
-- ALTER TABLE Requirements ADD ;
-- Cv skill
-- ALTER TABLE CV_has_Skills ADD ;
-- ALTER TABLE CV_has_Skills ADD ;

-- BlackList
-- ALTER TABLE BlackList ADD ;

-- Department hires Position
-- ALTER TABLE Position ADD ;
-- ALTER TABLE Position ADD ;

-- Interview
-- Interview is Conducted by
-- ALTER TABLE Interview ADD ;
-- Reccer create Interview
-- ALTER TABLE Interview ADD ;
-- ITRS - interview
-- ALTER TABLE Interview ADD ;
-- Application of interview
-- ALTER TABLE Interview ADD ;
-- Candidate attend Interview
-- ALTER TABLE Interview ADD CONSTRAINT FK_CandidateAttendInterview FOREIGN KEY (CandidateId) REFERENCES Candidate(CandidateId);
-- CV in interview
-- ALTER TABLE Interview ADD CONSTRAINT FK_CVinInterview FOREIGN KEY (CVId) REFERENCES CV(CVId);
-- Positon is interviewed
-- ALTER TABLE Interview ADD CONSTRAINT FK_isInterviewed FOREIGN KEY (PositionId) REFERENCES Position(PositionId);

-- Event
-- ALTER TABLE Event ADD ;

-- Check enddate > startdate
-- ALTER TABLE Position ADD 

-- Language
-- ALTER TABLE Position ADD 

-- Interviewer, reccer of department
-- ALTER TABLE Interviewer ADD 
-- ALTER TABLE Recruiter ADD 

-- Application
-- ALTER TABLE Application ADD 
-- ALTER TABLE Application ADD 
-- ALTER TABLE Application ADD 

-- ITRSInterview
-- ALTER TABLE ITRSInterview ADD 
-- ALTER TABLE ITRSInterview ADD 

-- Question category
-- ALTER TABLE Question ADD 
-- Question skill
-- ALTER TABLE QuestionSkills ADD 
-- ALTER TABLE QuestionSkills ADD 
-- Question round
-- ALTER TABLE Round ADD 
-- ALTER TABLE Round ADD 

-- SuccessfulCadidate
-- ALTER TABLE SuccessfulCadidate ADD 
-- ALTER TABLE SuccessfulCadidate ADD 


-- Candidate join event
-- ALTER TABLE CandidateJoinEvent ADD 
-- ALTER TABLE CandidateJoinEvent ADD 

-- Reccer create Report
-- ALTER TABLE Report ADD 