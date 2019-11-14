﻿using System;
using System.Collections.Generic;

namespace Examportal.Models
{
    public partial class CandidateAnswer
    {
        public string Email { get; set; }
        public int? TotalScore { get; set; }
        public string TestCode { get; set; }
        public string CompletionTime { get; set; }
        public byte? SubmitExam { get; set; }
        public byte? CorrectStatus { get; set; }
        public int? QuestionId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }

        public Users EmailNavigation { get; set; }
        public Questions Question { get; set; }
    }
}