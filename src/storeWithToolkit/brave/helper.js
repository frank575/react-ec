import { EBraveJob } from "@/enums/EBraveJob";

/**
 * @type {{
 *   id: number
 *   name: string
 *   job: number
 * }}
 */
const brave = {}

const jobText = {
  [EBraveJob.A]: '戰士',
  [EBraveJob.AA]: '狂戰士',
  [EBraveJob.AAA]: '聖鬥士',
  [EBraveJob.B]: '忍者',
  [EBraveJob.BB]: '暗殺者',
  [EBraveJob.C]: '村名'
}

const jobUrl = {
  [EBraveJob.A]: 'http://dj.x-legend.com.tw/02intro/images/5-10-1.jpg',
  [EBraveJob.AA]: 'https://vovo2000.com/images/63989.jpg',
  [EBraveJob.AAA]: 'https://resource01-proxy.ulifestyle.com.hk/res/v3/image/content/2450000/2452413/mei02--_1024.jpg',
  [EBraveJob.B]: 'http://jpninfo.com/wp-content/uploads/sites/2/2018/05/Fotolia_140328500_Subscription_Monthly_M-e1527056277872.jpg',
  [EBraveJob.BB]: 'https://www.steamxo.com/wp-content/uploads/2018/12/HCf2Fq191928_504898.jpg',
  [EBraveJob.C]: 'https://thumbs.dreamstime.com/z/%E5%8A%A8%E7%94%BB%E7%89%87%E5%AE%B3%E7%BE%9E%E7%9A%84%E6%9D%91%E6%B0%91%E4%BA%BA%E5%AD%97%E7%AC%A6%E9%9D%A2%E5%AD%94-102546087.jpg',
}

const checkUpgradeJob = (job) => {
  switch (job) {
    case EBraveJob.A:
      return EBraveJob.AA
    case EBraveJob.AA:
      return EBraveJob.AAA
    case EBraveJob.B:
      return EBraveJob.BB
    default:
      return false
  }
}

export const BraveHelper = {
  jobText,
  jobUrl,
  checkUpgradeJob
}
