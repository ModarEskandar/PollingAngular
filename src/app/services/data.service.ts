import { Question } from '../store/models/question.model';
import { Injectable } from '@angular/core';
import { IQuestion } from '../store/models/question.model';
import { IUser } from '../store/models/user.model';
@Injectable({ providedIn: 'root' })
export class DataService {
  constructor() {}
  private users: IUser = {
    sarahedo: {
      id: 'sarahedo',
      name: 'Sarah Edo',
      avatarURL: 'https://robohash.org/DND.png?set=set1&size=150x150',

      answers: {
        '8xf0y6ziyjabvozdd253nd': 'optionOne',
        '6ni6ok3ym7mf1p33lnez': 'optionTwo',
        am8ehyc8byjqgar0jgpub9: 'optionTwo',
        loxhs1bqm25b708cmbf3g: 'optionTwo',
      },
      questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
    },
    tylermcginnis: {
      id: 'tylermcginnis',
      name: 'Tyler McGinnis',
      avatarURL: 'https://robohash.org/FGG.png?set=set1&size=150x150',
      answers: {
        vthrdm985a262al8qx3do: 'optionOne',
        xj352vofupe1dqz9emx13r: 'optionTwo',
      },
      questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
    johndoe: {
      id: 'johndoe',
      name: 'John Doe',
      avatarURL: 'https://robohash.org/ZVO.png?set=set1&size=150x150',

      answers: {
        xj352vofupe1dqz9emx13r: 'optionOne',
        vthrdm985a262al8qx3do: 'optionTwo',
        '6ni6ok3ym7mf1p33lnez': 'optionTwo',
      },
      questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
    },
  };

  private questions = {
    '8xf0y6ziyjabvozdd253nd': {
      id: '8xf0y6ziyjabvozdd253nd',
      author: 'sarahedo',
      timestamp: 1467166872634,
      optionOne: {
        votes: ['sarahedo'],
        text: 'have horrible short term memory',
      },
      optionTwo: {
        votes: [],
        text: 'have horrible long term memory',
      },
    },
    '6ni6ok3ym7mf1p33lnez': {
      id: '6ni6ok3ym7mf1p33lnez',
      author: 'johndoe',
      timestamp: 1468479767190,
      optionOne: {
        votes: [],
        text: 'become a superhero',
      },
      optionTwo: {
        votes: ['johndoe', 'sarahedo'],
        text: 'become a supervillain',
      },
    },
    am8ehyc8byjqgar0jgpub9: {
      id: 'am8ehyc8byjqgar0jgpub9',
      author: 'sarahedo',
      timestamp: 1488579767190,
      optionOne: {
        votes: [],
        text: 'be telekinetic',
      },
      optionTwo: {
        votes: ['sarahedo'],
        text: 'be telepathic',
      },
    },
    loxhs1bqm25b708cmbf3g: {
      id: 'loxhs1bqm25b708cmbf3g',
      author: 'tylermcginnis',
      timestamp: 1482579767190,
      optionOne: {
        votes: [],
        text: 'be a front-end developer',
      },
      optionTwo: {
        votes: ['sarahedo'],
        text: 'be a back-end developer',
      },
    },
    vthrdm985a262al8qx3do: {
      id: 'vthrdm985a262al8qx3do',
      author: 'tylermcginnis',
      timestamp: 1489579767190,
      optionOne: {
        votes: ['tylermcginnis'],
        text: 'find $50 yourself',
      },
      optionTwo: {
        votes: ['johndoe'],
        text: 'have your best friend find $500',
      },
    },
    xj352vofupe1dqz9emx13r: {
      id: 'xj352vofupe1dqz9emx13r',
      author: 'johndoe',
      timestamp: 1493579767190,
      optionOne: {
        votes: ['johndoe'],
        text: 'write JavaScript',
      },
      optionTwo: {
        votes: ['tylermcginnis'],
        text: 'write Swift',
      },
    },
  };

  generateUID() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
  getUsers() {
    return { ...this.users };
  }
  _getUsers(): Promise<IUser> {
    return new Promise((res, rej) => {
      setTimeout(() => res(this.users), 1000);
    });
  }

  _getQuestions(): Promise<IQuestion> {
    return new Promise((res, rej) => {
      setTimeout(() => res(this.questions), 1000);
    });
  }

  formatQuestion(optionOneText: string, optionTwoText: string, author: string) {
    return {
      id: this.generateUID(),
      timestamp: Date.now(),
      author,
      optionOne: {
        votes: [],
        text: optionOneText,
      },
      optionTwo: {
        votes: [],
        text: optionTwoText,
      },
    };
  }

  _saveQuestion(
    optionOneText: string,
    optionTwoText: string,
    author: string
  ): Promise<Question> {
    return new Promise((res, rej) => {
      const authedUser = author;
      const formattedQuestion = this.formatQuestion(
        optionOneText,
        optionTwoText,
        author
      );
      const usersIds = Object.keys(this.users);
      //const userEntries = Object.entries(this.users);
      const userValues = Object.values(this.users).map((user) => {
        if (user.id === authedUser) user.questions.push(formattedQuestion.id);
        return user;
      });
      //const userValues = Object.values(this.users);
      const usersObj: IUser = {};
      //userValues.slice()
      setTimeout(() => {
        this.questions = {
          ...this.questions,
          [formattedQuestion.id]: formattedQuestion,
        };
        usersIds.forEach((element, index) => {
          usersObj[element] = userValues[index];
        });
        this.users = usersObj as IUser;
        // this.users = {
        //   ...this.users,
        //   [authedUser]: {
        //     this.users[authedUser],
        //     questions: this.users[authedUser].questions.concat([formattedQuestion.id])
        //   }
        // }

        res(formattedQuestion);
      }, 1000);
    });
  }

  //  function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  //   return new Promise((res, rej) => {
  //     setTimeout(() => {
  //       users = {
  //         ...users,
  //         [authedUser]: {
  //           ...users[authedUser],
  //           answers: {
  //             ...users[authedUser].answers,
  //             [qid]: answer
  //           }
  //         }
  //       }

  //       questions = {
  //         ...questions,
  //         [qid]: {
  //           ...questions[qid],
  //           [answer]: {
  //             ...questions[qid][answer],
  //             votes: questions[qid][answer].votes.concat([authedUser])
  //           }
  //         }
  //       }

  //       res()
  //     }, 500)
  //   })
  // }
}
