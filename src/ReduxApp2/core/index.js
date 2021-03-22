/**
 * @type {{
 *   id: number
 *   name: string
 *   job: number
 * }}
 */
const brave = {}

const EJob = {
  A: 1,
  AA: 2,
  AAA: 3,
  B: 4,
  BB: 5,
  C: 6,
}

const jobText = {
  [EJob.A]: '戰士',
  [EJob.AA]: '狂戰士',
  [EJob.AAA]: '聖鬥士',
  [EJob.B]: '忍者',
  [EJob.BB]: '暗殺者',
  [EJob.C]: '村名'
}

const jobUrl = {
  [EJob.A]: 'http://dj.x-legend.com.tw/02intro/images/5-10-1.jpg',
  [EJob.AA]: 'https://vovo2000.com/images/63989.jpg',
  [EJob.AAA]: 'https://resource01-proxy.ulifestyle.com.hk/res/v3/image/content/2450000/2452413/mei02--_1024.jpg',
  [EJob.B]: 'http://jpninfo.com/wp-content/uploads/sites/2/2018/05/Fotolia_140328500_Subscription_Monthly_M-e1527056277872.jpg',
  [EJob.BB]: 'https://www.steamxo.com/wp-content/uploads/2018/12/HCf2Fq191928_504898.jpg',
  [EJob.C]: 'https://thumbs.dreamstime.com/z/%E5%8A%A8%E7%94%BB%E7%89%87%E5%AE%B3%E7%BE%9E%E7%9A%84%E6%9D%91%E6%B0%91%E4%BA%BA%E5%AD%97%E7%AC%A6%E9%9D%A2%E5%AD%94-102546087.jpg',
}

const upgradeJob = (job) => {
  switch (job) {
    case EJob.A:
      return EJob.AA
    case EJob.AA:
      return EJob.AAA
    case EJob.B:
      return EJob.BB
    default:
      return false
  }
}

const create = async brave => {
  if (!brave.name) {
    throw new Error('勇者名稱不得為空')
  }
  if (!brave.job) {
    throw new Error('勇者職業不得為空')
  }
  return fetch('http://localhost:3000/brave', {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(brave)
  }).then(async res => await res.json())
}

const getList = async () => {
  return fetch('http://localhost:3000/brave').then(async res => await res.json())
}

export const BraveCore = {
  EJob,
  jobText,
  jobUrl,
  getList,
  create,
  upgradeJob,
}
