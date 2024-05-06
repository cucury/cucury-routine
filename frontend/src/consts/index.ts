export enum DayType {
  '일',
  '월',
  '화',
  '수',
  '목',
  '금',
  '토',
}

export const DiaryMood = {
  Ordinary: '평범',
  Happiness: '행복',
  Tranquility: '평온',
  Depressed: '우울',
  Tired: '피곤',
  Aggro: '화남',
  Good: '좋음',
  Sadness: '슬픔',
  Busyness: '바쁨',
  Pain: '아픔'
}

export const dummyWeeks = [
  [
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 1.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 2.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 3.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 4.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 5.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 7.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 8.').getTime() }
  ],
  [
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 9.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 10.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 11.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 12.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 13.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 14.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 15.').getTime() }
  ],
  [
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 16.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 17.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 18.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 19.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 20.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 21.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 22.').getTime() }
  ],
  [
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 23.').getTime() },
    {
      id: 23,
      mood: '좋음',
      content: 'hogehoge',
      time: new Date('2024. 4. 24.').getTime(),
    },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 25.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 26.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 27.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 28.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 29.').getTime() }
  ],
  [
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 30.').getTime() },
    { id: -1, mood: '', content: '', time: new Date('2024. 4. 31.').getTime() }
  ]
]
