import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleService from "../service/article";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";
import moment from "moment";
import { Loader } from "../ui";

const ArticleDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { articleDetail } = useSelector((state) => state.article);

  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const response = await ArticleService.getArticleDetail(slug);
        dispatch(getArticleDetailSuccess(response.article));
      } catch (error) {
        dispatch(getArticleDetailFailure());
      }
    };

    getArticleDetail();
  }, [slug]);

  return (
    <div>
      {articleDetail ? (
        <div class="container py-4">
          <h1 className="display-5 fw-bold">{articleDetail.title}</h1>
          <p className="col-md-8 fs-4">{articleDetail.description}</p>
          <div className="d-flex gap-3">
            <p className="text-muted">
              <span className="fw-bold">Created at: </span>
              {moment(articleDetail.createdAt).format("DD-MMM YYYY")}
            </p>
          </div>

          <div className="row">
            <div class="col-md-6">
              <div class=" rounded-3">
                <p>{articleDetail.body}</p>
              </div>
            </div>

            <div class="col-md-6">
              <div class="row g-0   overflow-hidden flex-md-row mb-4  h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-primary text-uppercase">
                    {articleDetail.author.username}
                  </strong>
                  <p class="card-text mb-auto">{articleDetail.author.bio}</p>
                </div>
                <div class="col-auto d-none d-lg-block">
                  <svg
                    class="bd-placeholder-img"
                    width="200"
                    height={"100%"}
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c"></rect>
                    <text
                      x={"45%"}
                      y={"53%"}
                      fill={"#fff"}
                      className="fs-2 text-uppercase p-0 m-0"
                    >
                      {articleDetail.author.username[0]}
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // <p>Loading...</p>
        <Loader />
      )}
    </div>
  );
};

export default ArticleDetail;

// {articleDetail ? (
// 	<>
// 		<h1 className="display-5 fw-bold">{articleDetail.title}</h1>
// 		<p className="col-md-8 fs-4">{articleDetail.description}</p>
// 		<div className="d-flex gap-3">
// 		<p className="text-muted">
// 			<span className="fw-bold">Created at: </span>{moment(articleDetail.createdAt).format('DD-MMM YYYY')}
// 		</p>
// 		</div>
// 		<div>
// 			{articleDetail.body}
// 		</div>

// 	</>
// ) : (
// 	// <p>Loading...</p>
// 	<Loader/>
// )}
