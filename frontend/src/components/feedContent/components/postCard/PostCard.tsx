import type { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStyles } from "./styles";
import { openPdf } from './functions/openPdf';
import type { PostCardProps } from "./types";
import type { User } from "@libs/types/user.type.js";
import { find, includes, startsWith, toLower } from "lodash/fp";
import { useQuery } from "@tanstack/react-query";
import userService from "../../../../services/user";
import { QUERY_KEYS } from "../../../../utils/queryKeys";

export const PostCard: FC<PostCardProps> = ({
  post: { _id, text, name, userId, media, likes, createdAt },
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "POST_CARD" });
  const classes = useStyles();

  const { data: users } = useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: userService.getAllUsers,
  });

  const author = users
    ? find((user: User) => String(user._id) === String(userId))(users)
    : undefined;

  const isPdf = media
    ? startsWith('data:application/pdf')(toLower(media)) ||
      includes<string>('application/pdf')(toLower(media))
    : false;
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
  const isImage = media
    ? startsWith('data:image')(toLower(media)) ||
      imageExtensions.some((ext) => includes<string>(ext)(toLower(media)))
    : false;

  return (
    <article className={classes.card}>
      <Link className={classes.author} to={`/users/${userId}`}>
        {author?.displayName ?? t("UNKNOWN_USER")}
      </Link>

      <p className={classes.username}>
        {author ? `@${author.username}` : t("USER_UNAVAILABLE")}
      </p>

      <h2 className={classes.name}>{name}</h2>
      <p className={classes.text}>{text}</p>

      {media && (
        isPdf ? (
          <button
            type="button"
            className={classes.mediaAttachment}
            onClick={(event) => {
              event.stopPropagation();
              openPdf(media);
            }}
          >
            <span className={classes.pdfIcon}>{t("PDF")}</span>
            <span className={classes.mediaName}>{name}{t("PDF_EXTENSION")}</span>
          </button>
        ) : isImage ? (
          <img className={classes.mediaImage} src={media} alt={name} />
        ) : (
          <a
            className={classes.media}
            href={media}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("VIEW_MEDIA")}
          </a>
        )
      )}

      <div className={classes.footer}>
        {createdAt
          ? new Date(createdAt).toLocaleString("he-IL")
          : t("DATE_UNAVAILABLE")}
        <span>{t("LIKES", { count: likes ?? 0 })}</span>
        <Link to={`/posts/${_id}/edit`}>{t("EDIT")}</Link>
      </div>
    </article>
  );
};
