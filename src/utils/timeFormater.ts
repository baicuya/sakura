import intl from '@/locales'
import { FormatDateOptions } from '@formatjs/intl'

type Unit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year'
export default class timeFormater {
  private date: Date
  private now: number
  private timestamp: number
  private timestampFromNow: number

  constructor(time: string | number | Date, now = Date.now()) {
    this.date = new Date(time)
    this.timestamp = this.date.getTime()
    this.now = now
    this.timestampFromNow = this.now - this.timestamp
  }

  public getReadableTimeFromNow() {
    const gap = this.timestampFromNow
    let num: number = 0
    let unit: Unit = 'second'
    if (gap < 60 * 1000) {
      num = gap / 1000
      unit = 'second'
    } else if (gap < 60 * 60 * 1000) {
      num = gap / (60 * 1000)
      unit = 'minute'
    } else if (gap < 24 * 60 * 60 * 1000) {
      num = gap / (60 * 60 * 1000)
      unit = 'hour'
    } else if (gap < 30.5 * 24 * 60 * 60 * 1000) {
      num = gap / (24 * 60 * 60 * 1000)
      unit = 'day'
    } else if (gap < 365 * 24 * 60 * 60 * 1000) {
      num = gap / (30.5 * 24 * 60 * 60 * 1000)
      unit = 'month'
    } else {
      num = gap / (365 * 24 * 60 * 60 * 1000)
      unit = 'year'
    }
    return intl.formatRelativeTime(Math.floor(num), unit, { style: 'narrow' })
  }

  public getFormatTime(
    opts: FormatDateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
  ) {
    return intl.formatTime(this.timestamp, opts)
  }

  public getFormatDate(
    opts: FormatDateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
  ) {
    return intl.formatDate(this.timestamp, opts)
  }

  public moreThanOneYear() {
    return this.timestampFromNow > 365 * 24 * 60 * 60 * 1000
  }

  public getDate() {
    return this.date
  }
}