import { OPERATING_HOURS, CAFE_INFO } from '../data/cafeData';

export interface CafeStatus {
  isOpen: boolean;
  messageEn: string;
  messageHi: string;
  todayTiming: string;
  dayName: string;
}

export function getCafeLiveStatus(): CafeStatus {
  const now = new Date();
  const dayIndex = now.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  
  // Map JS dayIndex (0=Sun, 1=Mon...) to OPERATING_HOURS index
  // OPERATING_HOURS has [Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6]
  const hourScheduleIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  const todaySchedule = OPERATING_HOURS[hourScheduleIndex];

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = todaySchedule.openHour * 60 + todaySchedule.openMin;
  const closeMinutes = todaySchedule.closeHour * 60 + todaySchedule.closeMin;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  if (isOpen) {
    return {
      isOpen: true,
      messageEn: `Open Now · Closes at ${todaySchedule.close}`,
      messageHi: `अभी खुला है · रात ${todaySchedule.close} बजे तक`,
      todayTiming: `${todaySchedule.open} - ${todaySchedule.close}`,
      dayName: todaySchedule.day,
    };
  } else if (currentMinutes < openMinutes) {
    return {
      isOpen: false,
      messageEn: `Closed Now · Opens today at ${todaySchedule.open}`,
      messageHi: `अभी बंद है · आज सुबह ${todaySchedule.open} बजे खुलेगा`,
      todayTiming: `${todaySchedule.open} - ${todaySchedule.close}`,
      dayName: todaySchedule.day,
    };
  } else {
    // Already closed for the day, check tomorrow
    const tomorrowIndex = (hourScheduleIndex + 1) % 7;
    const tomorrowSchedule = OPERATING_HOURS[tomorrowIndex];
    return {
      isOpen: false,
      messageEn: `Closed for today · Opens tomorrow at ${tomorrowSchedule.open}`,
      messageHi: `आज बंद हो चुका है · कल सुबह ${tomorrowSchedule.open} बजे खुलेगा`,
      todayTiming: `${todaySchedule.open} - ${todaySchedule.close}`,
      dayName: todaySchedule.day,
    };
  }
}

export function generateWhatsAppOrderUrl(
  items: { name: string; quantity: number; price: number }[],
  orderType: 'dine_in' | 'takeaway',
  tableNumber?: string,
  customerName?: string,
  customerNote?: string
): string {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  let msg = `👋 Namaste Feeling Cafe Gandai!\n\nI want to place an order:\n`;
  msg += `-------------------------\n`;
  items.forEach((item, idx) => {
    msg += `${idx + 1}. ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
  });
  msg += `-------------------------\n`;
  msg += `Total Amount: ₹${total}\n`;
  msg += `Order Type: ${orderType === 'dine_in' ? '🍽️ Dine-In' : '🥡 Takeaway / Parcel'}\n`;
  if (orderType === 'dine_in' && tableNumber) {
    msg += `Table Number / Spot: Table ${tableNumber}\n`;
  }
  if (customerName) {
    msg += `Customer Name: ${customerName}\n`;
  }
  if (customerNote) {
    msg += `Special Request: ${customerNote}\n`;
  }
  msg += `\nPlease confirm my order. Thank you!`;

  return `https://wa.me/${CAFE_INFO.cleanPhone}?text=${encodeURIComponent(msg)}`;
}

export function generateBookingWhatsAppUrl(details: {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  specialRequest?: string;
}): string {
  let msg = `👋 Hello Feeling Cafe, Gandai!\n\nI would like to book a table / party reservation:\n\n`;
  msg += `👤 Name: ${details.name}\n`;
  msg += `📞 Contact: ${details.phone}\n`;
  msg += `📅 Date: ${details.date}\n`;
  msg += `⏰ Time: ${details.time}\n`;
  msg += `👥 Guests: ${details.guests}\n`;
  msg += `🎉 Occasion: ${details.occasion}\n`;
  if (details.specialRequest) {
    msg += `✨ Special Request: ${details.specialRequest}\n`;
  }
  msg += `\nPlease let me know table availability. Thank you!`;

  return `https://wa.me/${CAFE_INFO.cleanPhone}?text=${encodeURIComponent(msg)}`;
}

export function generateComboWhatsAppUrl(comboTitle: string, price: number): string {
  const msg = `👋 Hello Feeling Cafe, Gandai!\n\nI want to order today's special offer:\n🔥 Combo: ${comboTitle} (Special Price: ₹${price})\n\nPlease let me know when it will be ready!`;
  return `https://wa.me/${CAFE_INFO.cleanPhone}?text=${encodeURIComponent(msg)}`;
}
