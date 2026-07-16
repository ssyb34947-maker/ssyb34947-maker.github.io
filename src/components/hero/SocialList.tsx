import clsx from 'clsx'
import { hero } from '@/config.json'
import { motion } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import { toast } from 'react-toastify'
import { useModal } from '@/components/ui/modal'

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export function SocialList({ className }: { className?: string }) {
  const { present } = useModal()

  return (
    <motion.ul
      className={clsx(
        'flex gap-4 flex-wrap items-center justify-center lg:justify-start',
        className,
      )}
      initial="hidden"
      animate="visible"
      transition={{
        staggerChildren: 0.1,
      }}
    >
      {hero.socials.map((social) => {
        const email = social.value
        const icon = (
          <>
            <span
              className="absolute inset-0 -z-1 rounded-full transition-transform group-hover:scale-105"
              style={{ backgroundColor: social.color }}
            />
            <i className={clsx('iconfont', social.icon)} aria-hidden="true" />
          </>
        )

        return (
          <motion.li key={social.name} variants={itemVariants}>
            {typeof email === 'string' ? (
              <button
                type="button"
                className="group relative flex size-9 cursor-pointer items-center justify-center text-xl text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                title="查看邮箱"
                aria-label="查看邮箱地址"
                onClick={() => {
                  present({
                    id: 'email-contact',
                    content: <EmailModal email={email} />,
                  })
                }}
              >
                {icon}
              </button>
            ) : (
              <a
                className="group relative flex size-9 items-center justify-center text-xl text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                href={social.url}
                title={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
              </a>
            )}
          </motion.li>
        )
      })}
      <motion.li variants={itemVariants}>
        <a
          className="group relative flex size-9 items-center justify-center text-xl text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          href="/cv"
          title="Academic CV"
          aria-label="查看学术简历"
        >
          <span
            className="absolute inset-0 -z-1 rounded-full bg-zinc-800 transition-transform group-hover:scale-105 dark:bg-zinc-100"
            aria-hidden="true"
          />
          <i
            className="iconfont icon-contacts-book text-white dark:text-zinc-900"
            aria-hidden="true"
          />
        </a>
      </motion.li>
    </motion.ul>
  )
}

function EmailModal({ email }: { email: string }) {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      toast.success('邮箱地址已复制')
    } catch {
      toast.error('复制失败，请手动复制邮箱地址')
    }
  }

  return (
    <motion.div
      className="w-[calc(100vw-2rem)] max-w-md rounded-2xl border border-primary bg-primary p-6 shadow-2xl"
      initial={{ y: 16, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 16, opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <Dialog.Title className="text-xl font-bold">联系我</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-secondary">
            欢迎通过以下邮箱与我联系
          </Dialog.Description>
        </div>
        <Dialog.Close asChild>
          <button
            type="button"
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-secondary transition-colors hover:bg-secondary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="关闭邮箱弹窗"
          >
            <i className="iconfont icon-close" aria-hidden="true" />
          </button>
        </Dialog.Close>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-xl bg-secondary p-4">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-lg text-white"
          style={{ backgroundColor: 'rgb(212, 70, 56)' }}
        >
          <i className="iconfont icon-mail" aria-hidden="true" />
        </span>
        <span className="min-w-0 break-all font-medium">{email}</span>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="rounded-lg border border-primary px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={copyEmail}
        >
          复制邮箱
        </button>
        <a
          className="rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          href={`mailto:${email}`}
        >
          发送邮件
        </a>
      </div>
    </motion.div>
  )
}
