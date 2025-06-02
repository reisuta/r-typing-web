<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
    <transition-group
      name="notification"
      tag="div"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'p-4 rounded-lg shadow-lg transition-all duration-300',
          notificationClasses[notification.type]
        ]"
      >
        <div class="flex items-start gap-3">
          <span class="text-xl">
            {{ notificationIcons[notification.type] }}
          </span>
          <div class="flex-1">
            <p class="text-sm font-medium">
              {{ notification.message }}
            </p>
          </div>
          <button
            class="text-gray-400 hover:text-gray-600"
            @click="removeNotification(notification.id)"
          >
            ✕
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useErrorHandler } from '~/composables/useErrorHandler'

const { notifications, removeNotification } = useErrorHandler()

const notificationClasses = {
  error: 'bg-red-100 text-red-800 border border-red-200',
  warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  info: 'bg-blue-100 text-blue-800 border border-blue-200',
}

const notificationIcons = {
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>