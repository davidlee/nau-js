import { Migration } from '@mikro-orm/migrations';

export class Migration20230902060841 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `entry` (`id` integer not null primary key autoincrement, `created` datetime not null, `updated` datetime null, `uid` text not null, `path` text not null, `type` text check (`type` in (\'Transient\', \'Note\', \'Area\', \'Objective\', \'Project\', \'Task\')) not null default \'Transient\', `status` text check (`status` in (\'Capture\', \'Draft\', \'Rework\', \'Clarify\', \'Incubate\', \'Backlog\', \'Icebox\', \'Ready\', \'Next\', \'Started\', \'Check\', \'Done\', \'Reflect\', \'Stalled\', \'Aborted\', \'Archive\', \'Deleted\')) not null default \'Draft\', `position` integer not null default 1, `priority` integer not null default 1, `urgency` text null, `text` text not null, `uri` text null, `tags` text not null default \'\', `meta` json not null, `recur` json null, `repeat` json null, `review` json null, `cron` datetime null, `due` datetime null, `end` datetime null, `scheduled` datetime null, `until` datetime null, `wait` datetime null, `start` datetime null, `reviewed` datetime null);');
  }

}
