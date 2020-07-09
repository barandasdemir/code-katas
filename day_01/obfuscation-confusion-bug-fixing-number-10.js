// some names are wrong but at least it's 'fixed' and readable now :)

class BatchController {
  constructor() {
    this.unprocessed = [];
    this.processed = [];
    this.reports = [];
    this.currentBatchId = 0;
  }

  addBatch(items) {
    this.unprocessed.push(new Batch(this.currentBatchId++, items));
    return this;
  }

  processLatestBatch() {
    if (this.unprocessed.length < 1) return;
    var batch = this.unprocessed.shift(),
      surveyReports = [],
      males = [],
      maleScore = 0,
      females = [],
      femaleScore = 0,
      others = [],
      otherScore = 0,
      questionCount = batch.items[1].items.length,
      surveyScore = batch.items.length;

    batch.items = batch.items.filter(survey => survey != null && survey.name.length);
    for (var index = 0; index < batch.items.length; index++) {
      var it = batch.items[index];
      it.name.replace(/[\w\s]/, '');
      it.items = it.items.sort((p, c) => {
        return p.id > c.id;
      });
      var surveyScore = it.items.reduce((acc, item) => acc + ((item.answer == item.userAnswer) ? 1 : 0), 0);

      switch (it.gender.toLowerCase()) {
        case 'male':
          males.push(it);
          maleScore += surveyScore;
          break;
        case 'female':
          females.push(it);
          femaleScore += surveyScore;
          break;
        default:
          others.push(it);
          otherScore += surveyScore;
          break;
      };

      let processQuestions = questions => {
        var str = [];
        for (var questionIndex = 0; questionIndex < questions.length; questionIndex++) {
          str.push(`#${questionIndex}\r\nQuestion: ${questions[questionIndex].question}\r\nAnswer: ${questions[questionIndex].answer}\r\nUser Answer:${questions[questionIndex].userAnswer}`);
        };
        return str.join('\r\n');
      };
      var processResults = (`Name: ${it.name}Gender: ${it.gender}Age: ${it.age}\r\n ${processQuestions(it.items)}Total Score: ${surveyScore}\r\n Batch Id: ${batch.id}\r\n`);
      surveyReports.push(new SurveyReport(index, it, processResults, surveyScore));
    }

    var maleTesters = {
        count: males.length,
        score: `${maleScore}/${questionCount * males.length}`,
        percentage: Math.round((maleScore / (questionCount * males.length) * 100)) || 0
      },
      femaleTesters = {
        count: females.length,
        score: `${femaleScore}/${questionCount * females.length}`,
        percentage: Math.round((femaleScore / (questionCount * females.length) * 100)) || 0
      },
      otherTesters = {
        count: others.length,
        score: `${otherScore}/${questionCount * others.length}`,
        percentage: Math.round((otherScore / (questionCount * others.length) * 100)) || 0
      },
      report = (`Report Id: ${this.reports.length+1}Total Surveys Taken: ${ surveyScore }\r\nTotal Males: ${ maleTesters.count }Total Male Score: ${ maleTesters.score }Score Percentage: ${maleTesters.percentage}%\r\nTotal Females: ${femaleTesters.count}Total Female Score: ${femaleTesters.score}Score Percentage: ${femaleTesters.percentage}\r\nTotal Others: ${otherTesters.count}Total Other Score: ${otherTesters.score}Score Percentage: ${otherTesters.percentage}%\r\nBatch Id: ${batch.id}`);

    var generalReport = new GeneralReport(report, batch.id, maleTesters, femaleTesters, otherTesters);
    this.reports.push(new Report(batch.id, surveyReports, generalReport));
    this.processed.push(batch);
  }
}
